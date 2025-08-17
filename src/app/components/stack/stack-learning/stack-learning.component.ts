import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface LearningItem {
  name: string;
  url: string;
  desc?: string;
  colorFrom?: string; // color inicio del gradiente
  colorTo?: string;   // color fin
  icon?: 'react' | 'generic';
}

@Component({
  selector: 'app-stack-learning',
  standalone: true,
  imports: [],
  templateUrl: './stack-learning.component.html',
  styleUrl: './stack-learning.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackLearningComponent {
  @Input() title = 'Estoy aprendiendo';
  @Input() items: LearningItem[] = [
    {
      name: 'React',
      url: 'https://react.dev/',
      desc: 'Componentes, hooks...',
      colorFrom: '#61dafb',
      colorTo:   '#80eaff',
      icon: 'react'
    }
  ];

  trackByName = (_: number, it: LearningItem) => it.name;
}
