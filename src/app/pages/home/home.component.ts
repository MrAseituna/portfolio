import { Component } from '@angular/core';
import { HeroComponent } from "../../components/home/hero/hero.component";
import { SkillGroup, SkillsComponent } from '../../components/home/skills/skills.component';
import { CtaComponent } from "../../components/home/cta/cta.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SkillsComponent, CtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  misGrupos: SkillGroup[] = [
    {
      title: 'Frontend',
      icon: 'bi-braces-asterisk',
      skills: [
        { name: 'Angular',      level: 85, note: 'SPA, CLI, formularios, routing' },
        { name: 'TypeScript',   level: 80 },
        { name: 'JavaScript',   level: 80 },
        { name: 'HTML5',        level: 95},
        { name: 'CSS (Layout)', level: 88, note: 'Flexbox, Grid, responsive' }
      ]
    },
    {
      title: 'Backend',
      icon: 'bi-hdd-network',
      skills: [
        { name: 'Django (Python)', level: 90 },
        { name: 'PHP',             level: 85 },
        { name: 'REST API',        level: 70 },
        { name: 'Node.js',         level: 70 },
        { name: 'Spring Boot',     level: 60 },
        { name: 'Moodle (plugins)', level: 90, note: 'Desarrollo y mantenimiento' },
      ]
    },
    {
      title: 'Bases de datos',
      icon: 'bi-database',
      skills: [
        { name: 'PostgreSQL', level: 55 },
        { name: 'SQL',        level: 75 },
        { name: 'MySQL/MariaDB', level: 80 }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: 'bi-gear',
      skills: [
        { name: 'Git / GitHub',   level: 85 },
        { name: 'Docker (básico)',level: 45 },
        { name: 'Linux / Nginx',  level: 70 }
      ]
    },
    {
      title: 'Idiomas',
      icon: 'bi-translate',
      skills: [
        { name: 'Español (nativo)', level: 100 },
        { name: 'Inglés (B2)', level: 70, note: 'FCE Cambridge' },
      ]
    }
  ];

}
