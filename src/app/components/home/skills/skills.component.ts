import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Skill {
  name: string;
  level: number;     // 0–100
  note?: string;     // opcional (años, foco, etc.)
}

export interface SkillGroup {
  title: string;
  icon: string;      // clase BI, ej: 'bi-braces-asterisk'
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgClass],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  @Input() title = 'Habilidades y stack';
  @Input() groups: SkillGroup[] = [
  ];

  trackGroup = (_: number, g: SkillGroup) => g.title;
  trackSkill = (_: number, s: Skill) => s.name;
}
