import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  snippet = `@Component({ selector: 'app-hero' })
    export class HeroComponent {
      hello = 'Hola, mundo 👋';
      get message(){
        return \`Listo para construir: \${this.hello}\`;
      }
    }`;

  @ViewChild('card', { static: true }) card!: ElementRef<HTMLElement>;

  onMove(e: MouseEvent) {
    const el = this.card?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;

    // límites suaves de rotación
    const max = 10; // grados
    const rx = (dy * -max).toFixed(2);
    const ry = (dx *  max).toFixed(2);

    // pasar variables a CSS para transform y glow
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);

    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top)  / rect.height) * 100;
    el.style.setProperty('--mx', `${mx}%`);
    el.style.setProperty('--my', `${my}%`);
  }

  resetTilt() {
    const el = this.card?.nativeElement;
    if (!el) return;
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
    el.style.setProperty('--mx', `50%`);
    el.style.setProperty('--my', `50%`);
  }
}
