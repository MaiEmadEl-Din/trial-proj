import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./formBuilder-component').then((m) => m.FormBuilderComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/canvas-component/canvas-component').then((m) => m.CanvasComponent),
  },
] as Routes;
