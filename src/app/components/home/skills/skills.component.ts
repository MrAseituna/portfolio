import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Skill {
  name: string;
  level: number;      // solo para tamaño visual (s/m/l)
  note?: string;
  icon?: string;      // Bootstrap Icons fallback
  src?: string;       // URL SVG (p.ej. cdn.simpleicons.org/angular)
  url?: string;       // docs/proyecto
}

export interface SkillGroup {
  title: string;
  icon: string;       // BI para cabecera del grupo
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgClass],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  @Input() title = 'Habilidades y stack';
  @Input() groups: SkillGroup[] = [];

  /** duplicamos el listado para bucle infinito visual */
  readonly reps = [0, 1];

  sizeClass(s: Skill): 'size-s' | 'size-m' | 'size-l' {
    const v = s.level ?? 0;
    if (v >= 85) return 'size-m';
    if (v >= 70) return 'size-s';
    return 'size-s';
  }

  /** duración de la cinta (más logos ⇒ más tiempo; alterna dirección en pares) */
  beltDuration(len: number, idx: number): string {
    const base = 22;                          // segundos
    const perItems = Math.min(1.1 * len, 24); // añade tiempo según cantidad
    const jitter = (idx % 2 ? 6 : 0);         // alterna un poco
    return `${base + perItems + jitter}s`;
  }
}
