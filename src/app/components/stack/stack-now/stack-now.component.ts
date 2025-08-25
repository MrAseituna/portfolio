import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type Category = 'Frontend' | 'Backend' | 'Bases de datos' | 'DevOps & Tools';
type Size = 's' | 'm' | 'l';
export interface LogoItem {
  name: string;
  category: Category;
  url?: string;          // docs / repo / demo
  src?: string;          // ruta del logo en /assets/logos/*
  icon?: string;         // fallback: clase Bootstrap Icons, ej: 'bi-braces-asterisk'
  size?: Size;           // s/m/l para variar el mosaico
  note?: string;
}

@Component({
  selector: 'app-stack-now',
  standalone: true,
  imports: [NgClass],
  templateUrl: './stack-now.component.html',
  styleUrl: './stack-now.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackNowComponent {
  @Input() title = 'Stack';
  @Input() items: LogoItem[] = [
    // --- Frontend ---
    { name: 'Angular',     category: 'Frontend', src: 'https://cdn.simpleicons.org/angular',     icon: 'bi-braces-asterisk', url: 'https://angular.dev',                           size: 'l' },
    { name: 'TypeScript',  category: 'Frontend', src: 'https://cdn.simpleicons.org/typescript',  icon: 'bi-code-slash',      url: 'https://www.typescriptlang.org/',               size: 'm' },
    { name: 'JavaScript',  category: 'Frontend', src: 'https://cdn.simpleicons.org/javascript',  icon: 'bi-filetype-js',     url: 'https://developer.mozilla.org/docs/Web/JavaScript', size: 's' },
    { name: 'HTML5',       category: 'Frontend', src: 'https://cdn.simpleicons.org/html5',       icon: 'bi-filetype-html',   url: 'https://developer.mozilla.org/docs/Web/HTML',   size: 's' },
    { name: 'CSS',         category: 'Frontend', src: 'https://cdn.simpleicons.org/css',        icon: 'bi-filetype-css',    url: 'https://developer.mozilla.org/docs/Web/CSS',    size: 's' },

    // --- Backend ---
    { name: 'Node.js',     category: 'Backend',  src: 'https://cdn.simpleicons.org/nodedotjs',   icon: 'bi-hdd-network',     url: 'https://nodejs.org/docs/latest/api/',          size: 'm' },
    { name: 'PHP',         category: 'Backend',  src: 'https://cdn.simpleicons.org/php',         icon: 'bi-filetype-php',    url: 'https://www.php.net/docs.php',                  size: 's' },
    { name: 'Django',      category: 'Backend',  src: 'https://cdn.simpleicons.org/django',      icon: 'bi-cpu',             url: 'https://docs.djangoproject.com/',               size: 'm' },
    { name: 'Spring Boot', category: 'Backend',  src: 'https://cdn.simpleicons.org/springboot',  icon: 'bi-cpu',             url: 'https://docs.spring.io/spring-boot/',           size: 's' },

    // --- Bases de datos ---
    { name: 'PostgreSQL',      category: 'Bases de datos', src: 'https://cdn.simpleicons.org/postgresql', icon: 'bi-database', url: 'https://www.postgresql.org/docs/',     size: 'm' },
    { name: 'MySQL/MariaDB',   category: 'Bases de datos', src: 'https://cdn.simpleicons.org/mysql',      icon: 'bi-database', url: 'https://dev.mysql.com/doc/',           size: 's' },
    { name: 'SQL',             category: 'Bases de datos', src: 'https://cdn.simpleicons.org/sqlite',     icon: 'bi-123',      url: 'https://www.sqlite.org/lang.html',    size: 's' },

    // --- DevOps & Tools ---
    { name: 'Git / GitHub',    category: 'DevOps & Tools', src: 'https://cdn.simpleicons.org/git',     icon: 'bi-git',         url: 'https://git-scm.com/doc',        size: 's' },
    { name: 'Docker',          category: 'DevOps & Tools', src: 'https://cdn.simpleicons.org/docker',  icon: 'bi-box-seam',    url: 'https://docs.docker.com/',        size: 'm' },
    { name: 'Linux/Bash',   category: 'DevOps & Tools', src: 'https://cdn.simpleicons.org/linux',   icon: 'bi-terminal',    url: 'https://nginx.org/en/docs/',      size: 's' },
    { name: 'Automatización',             category: 'DevOps & Tools', src: 'https://cdn.simpleicons.org/n8n',     icon: 'bi-diagram-3',   url: 'https://docs.n8n.io/',            size: 's' },
    { name: 'Moodle (plugins)',category: 'DevOps & Tools', src: 'https://cdn.simpleicons.org/moodle',  icon: 'bi-mortarboard', url: 'https://docs.moodle.org/',        size: 'm' },
  ];

  categories: (Category | 'Todos')[] = ['Todos', 'Frontend', 'Backend', 'Bases de datos', 'DevOps & Tools'];
  selected: Category | 'Todos' = 'Todos';

  setFilter(cat: Category | 'Todos') { this.selected = cat; }
  isActive(cat: Category | 'Todos') { return this.selected === cat; }

  get visible(): LogoItem[] {
    return this.selected === 'Todos' ? this.items : this.items.filter(i => i.category === this.selected);
  }

  trackByName = (_: number, it: LogoItem) => it.name;
}
