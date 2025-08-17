import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StackNowComponent } from "../../components/stack/stack-now/stack-now.component";
import { StackLearningComponent } from "../../components/stack/stack-learning/stack-learning.component";

type Category = 'Frontend' | 'Backend' | 'Bases de datos' | 'DevOps & Tools';

export interface Tech {
  name: string;
  icon: string;       // Bootstrap Icons, ej: 'bi-braces-asterisk'
  category: Category;
  url?: string;       // opcional
  note?: string;      // tooltip opcional
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [NgClass, StackNowComponent, StackLearningComponent],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css'
})
export class StackComponent {
  @Input() title = 'Stack y herramientas';
  @Input() techs: Tech[] = [
    // Frontend
    { name: 'Angular',        icon: 'bi-braces-asterisk', category: 'Frontend', note: 'SPA, CLI, formularios, routing' },
    { name: 'TypeScript',     icon: 'bi-code-slash',      category: 'Frontend' },
    { name: 'JavaScript',     icon: 'bi-filetype-js',     category: 'Frontend' },
    { name: 'HTML5',          icon: 'bi-filetype-html',   category: 'Frontend' },
    { name: 'CSS (Layout)',   icon: 'bi-filetype-css',    category: 'Frontend', note: 'Flexbox, Grid, responsive' },

    // Backend
    { name: 'Django (Python)', icon: 'bi-filetype-py',    category: 'Backend' },
    { name: 'PHP',             icon: 'bi-filetype-php',   category: 'Backend' },
    { name: 'REST API',        icon: 'bi-diagram-3',      category: 'Backend' },
    { name: 'Node.js',         icon: 'bi-hdd-network',    category: 'Backend' },
    { name: 'Spring Boot',     icon: 'bi-cpu',            category: 'Backend' },
    { name: 'Moodle (plugins)',icon: 'bi-mortarboard',    category: 'Backend', note: 'Desarrollo y mantenimiento' },

    // Bases de datos
    { name: 'PostgreSQL',      icon: 'bi-database',       category: 'Bases de datos' },
    { name: 'SQL',             icon: 'bi-database',            category: 'Bases de datos' },
    { name: 'MySQL/MariaDB',   icon: 'bi-database',       category: 'Bases de datos' },

    // DevOps & Tools
    { name: 'Git / GitHub',    icon: 'bi-git',            category: 'DevOps & Tools' },
    { name: 'Docker (básico)', icon: 'bi-box-seam',       category: 'DevOps & Tools' },
    { name: 'Linux / Nginx',   icon: 'bi-terminal',       category: 'DevOps & Tools' },
  ];

  categories: (Category | 'Todos')[] = ['Todos', 'Frontend', 'Backend', 'Bases de datos', 'DevOps & Tools'];
  selected: Category | 'Todos' = 'Todos';

  @ViewChild('cloud', { static: true }) cloud!: ElementRef<HTMLElement>;
  @ViewChildren('chipEl') chipEls!: QueryList<ElementRef<HTMLAnchorElement>>;
  private reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  ngAfterViewInit(): void {
    // Limpia offsets por si llega con SSR/hidratación rara
    this.resetOffsets();
  }

  setFilter(cat: Category | 'Todos') { this.selected = cat; }
  isActive(cat: Category | 'Todos') { return this.selected === cat; }

  get visible(): Tech[] {
    return this.selected === 'Todos' ? this.techs : this.techs.filter(t => t.category === this.selected);
  }

  onMove(e: MouseEvent) {
    if (this.reduceMotion) return;
    const cloud = this.cloud.nativeElement;
    const rect = cloud.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const R = 140;          // radio de influencia (px)
    const MAX = 22;         // desplazamiento máximo (px)

    for (const ref of this.chipEls) {
      const el = ref.nativeElement;
      const r = el.getBoundingClientRect();
      const cx = (r.left - rect.left) + r.width / 2;
      const cy = (r.top  - rect.top)  + r.height / 2;

      const dx = cx - mx;
      const dy = cy - my;
      const d = Math.hypot(dx, dy);

      let ox = 0, oy = 0;
      if (d < R && d > 0.0001) {
        const force = (1 - d / R);             // 0..1
        const scale = (force * force) * MAX;   // easing cuadrático
        ox = (dx / d) * scale;
        oy = (dy / d) * scale;
      }
      el.style.setProperty('--ox', `${ox.toFixed(1)}px`);
      el.style.setProperty('--oy', `${oy.toFixed(1)}px`);
    }
  }

  resetOffsets() {
    for (const ref of this.chipEls) {
      const el = ref.nativeElement;
      el.style.setProperty('--ox', '0px');
      el.style.setProperty('--oy', '0px');
    }
  }
}
