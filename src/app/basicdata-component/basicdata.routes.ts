import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./basicdata-component').then((m) => m.BasicdataComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/basicdata-form/basicdata-form').then((m) => m.BasicdataForm),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/basicdata-form/basicdata-form').then((m) => m.BasicdataForm),
  },
] as Routes;
