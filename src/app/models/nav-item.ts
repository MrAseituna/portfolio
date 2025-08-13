export interface NavItem {
  label: string;
  icon: string;           // clase de Bootstrap Icons, p.ej. 'bi-house'
  routerLink: string;     // ruta base
  fragment?: string;      // id de sección dentro de la página
}
