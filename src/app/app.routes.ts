import { Routes } from '@angular/router';
import { LayoutComponent } from './layout-component/layout-component';
import { HomeComponent } from './home-component/home-component';

export const routes: Routes = [
    {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'basic-data',
         loadChildren: () => import('./basicdata-component/basicdata.routes'), },
    //   { path: 'definitions', component: DefinitionsComponent },
      { path: 'form-builder', loadChildren: () => import('./formBuilder-component/formBuilder.routes'), },
    //   { path: 'dashboard-builder', component: DashboardBuilderComponent },
    //   { path: 'table-builder', component: TableBuilderComponent },
    //   { path: 'menu-builder', component: MenuBuilderComponent },
    //   { path: 'flow-builder', component: FlowBuilderComponent },
    //   { path: 'system-configurations', component: SystemConfigurationsComponent },
    //   { path: 'users-management', component: UsersManagementComponent },
    ],
  },
];
