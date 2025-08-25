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
        { name:'Angular',     level: 90, src:'https://cdn.simpleicons.org/angular',     url:'https://angular.dev' },
        { name:'TypeScript',  level: 85, src:'https://cdn.simpleicons.org/typescript',  url:'https://www.typescriptlang.org/docs' },
        { name:'JavaScript',  level: 80, src:'https://cdn.simpleicons.org/javascript' },
        { name:'HTML5',       level: 95, src:'https://cdn.simpleicons.org/html5' },
        { name:'CSS',         level: 90, src:'https://cdn.simpleicons.org/css' },
      ]
    },
    {
      title: 'Backend',
      icon: 'bi-hdd-network',
      skills: [
        { name:'Node.js',     level: 75, src:'https://cdn.simpleicons.org/nodedotjs',   url:'https://nodejs.org/docs/latest/api' },
        { name:'PHP',         level: 80, src:'https://cdn.simpleicons.org/php' },
        { name:'Django',      level: 85, src:'https://cdn.simpleicons.org/django' },
        { name:'Spring Boot', level: 60, src:'https://cdn.simpleicons.org/springboot' }
      ]
    },
    {
      title: 'DB & DevOps',
      icon: 'bi-gear',
      skills: [
        { name:'PostgreSQL',  level: 70, src:'https://cdn.simpleicons.org/postgresql' },
        { name:'MySQL',       level: 65, src:'https://cdn.simpleicons.org/mysql' },
        { name:'Git/GitHub',  level: 85, src:'https://cdn.simpleicons.org/git' },
        { name:'Docker',      level: 60, src:'https://cdn.simpleicons.org/docker' },
        { name:'Linux/Bash',       level: 70, src:'https://cdn.simpleicons.org/linux' },
        { name:'Moodle',      level: 80, src:'https://cdn.simpleicons.org/moodle' },
        { name:'Automatización',         level: 65, src:'https://cdn.simpleicons.org/n8n' }
      ]
    }
  ];

}
