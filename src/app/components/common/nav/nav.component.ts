import { NavItem } from '../../../models/nav-item';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

type Theme = 'auto' | 'dark' | 'light';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements AfterViewInit {

  items: NavItem[] = [
    { label: 'Inicio',     icon: 'bi-house',            routerLink: '/', fragment: 'inicio' },
    { label: 'Proyectos',  icon: 'bi-rocket-takeoff',  routerLink: '/', fragment: 'proyectos' },
    { label: 'Stack',      icon: 'bi-cpu',             routerLink: '/', fragment: 'stack' },
    { label: 'Contacto',   icon: 'bi-envelope-paper',  routerLink: '/', fragment: 'contacto' },
  ];
/* ----- Ink bar ----- */
  @ViewChild('bar', { static: true }) bar!: ElementRef<HTMLElement>;
  @ViewChildren('navLink') links!: QueryList<ElementRef<HTMLElement>>;
  inkWidth = 0;
  inkX = 0;
  get inkTransform() { return `translateX(${this.inkX}px)`; }

  /* ----- Tema ----- */
  themeMode: Theme = (localStorage.getItem('theme') as Theme) || 'auto';
  private media = window.matchMedia('(prefers-color-scheme: dark)');
  get themeLabel(): string {
    if (this.themeMode === 'auto') return 'Auto';
    return this.effectiveTheme() === 'dark' ? 'Oscuro' : 'Claro';
  }
  get themeIcon(): string {
    if (this.themeMode === 'auto') return 'bi-circle-half';
    return this.effectiveTheme() === 'dark' ? 'bi-moon-stars' : 'bi-brightness-high';
  }

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Ink inicial
    queueMicrotask(() => this.moveInkToActive());

    // Reposicionar al navegar / redimensionar
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.moveInkToActive());

    const ro = new ResizeObserver(() => this.moveInkToActive());
    ro.observe(this.bar.nativeElement);

    // Aplicar tema al cargar y reaccionar a cambios del sistema en 'auto'
    this.applyTheme(this.themeMode);
    this.media.addEventListener?.('change', () => {
      if (this.themeMode === 'auto') this.applyTheme('auto');
    });
  }

  @HostListener('window:resize') onResize() { this.moveInkToActive(); }

  hoverTo(index: number) {
    const link = this.links.get(index)?.nativeElement;
    if (!link) return;
    this.positionInk(link);
  }

  resetInk() { this.moveInkToActive(); }

  private moveInkToActive() {
    const active = this.links.find(l => l.nativeElement.classList.contains('active'))?.nativeElement
                ?? this.links.first?.nativeElement;
    if (active) this.positionInk(active);
  }

  private positionInk(target: HTMLElement) {
    const barRect = this.bar.nativeElement.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    this.inkWidth = Math.round(rect.width);
    this.inkX = Math.round(rect.left - barRect.left);
  }

  /* ----- Tema: cycle / apply / effective ----- */
  cycleTheme() {
    const order: Theme[] = ['auto', 'dark', 'light'];
    const next = order[(order.indexOf(this.themeMode) + 1) % order.length];
    this.themeMode = next;
    localStorage.setItem('theme', next);
    this.applyTheme(next);
  }

  private applyTheme(mode: Theme) {
    document.documentElement.setAttribute('data-theme', mode);
    // no forzamos colores aquí: se leen de CSS por [data-theme]
  }

  private effectiveTheme(): 'dark' | 'light' {
    if (this.themeMode === 'auto') return this.media.matches ? 'dark' : 'light';
    return this.themeMode;
  }
}
