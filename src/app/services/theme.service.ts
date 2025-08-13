import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';
const THEME_KEY = 'theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private media = window.matchMedia('(prefers-color-scheme: dark)');

  init() {
    // aplica el tema guardado (o 'auto' por defecto)
    const saved = (localStorage.getItem(THEME_KEY) as Theme) || 'auto';
    this.apply(saved);
  }

  get(): Theme {
    return (localStorage.getItem(THEME_KEY) as Theme) || 'auto';
  }

  set(theme: Theme) {
    localStorage.setItem(THEME_KEY, theme);
    this.apply(theme);
  }

  cycle(): Theme {
    const order: Theme[] = ['auto', 'dark', 'light'];
    const curr = this.get();
    const next = order[(order.indexOf(curr) + 1) % order.length];
    this.set(next);
    return next;
  }

  /** 'dark' si el sistema está en dark y el tema es auto, si no, lo que hayas elegido */
  getEffective(): 'light' | 'dark' {
    const t = this.get();
    if (t === 'auto') return this.media.matches ? 'dark' : 'light';
    return t;
  }

  private apply(theme: Theme) {
    const root = document.documentElement; // <html>
    root.setAttribute('data-theme', theme);
  }
}
