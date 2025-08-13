import { Component } from '@angular/core';
import { Theme, ThemeService } from '../../../services/theme.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  mode: Theme = this.theme.get();
  constructor(
    private theme: ThemeService
  ) {}

  get icon(): string {
    const eff = this.theme.getEffective();
    return this.mode === 'auto' ? 'bi-circle-half' : (eff === 'dark' ? 'bi-moon-stars' : 'bi-brightness-high');
  }

  get label(): string {
    return this.mode === 'auto' ? 'Auto' : (this.theme.getEffective() === 'dark' ? 'Oscuro' : 'Claro');
  }

  toggle() {
    this.mode = this.theme.cycle();
  }
}
