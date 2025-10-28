import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent {
  router = inject(Router);
  modules = [
    { title: 'Basic Data', icon: 'esc-icons:database', route: '/basic-data' },
    { title: 'Definitions', icon: 'esc-icons:database', route: '/definitions' },
    { title: 'Form Builder', icon: 'esc-icons:text-cursor-input', route: '/form-builder' },
    { title: 'Dashboard Builder', icon: 'esc-icons:file-chart-pie', route: '/dashboard-builder' },
    { title: 'Table Builder', icon: 'esc-icons:table-properties', route: '/table-builder' },
    { title: 'Menu Builder', icon: 'esc-icons:list-minus', route: '/menu-builder' },
    { title: 'Flow Builder', icon: 'esc-icons:workflow', route: '/flow-builder' },
    { title: 'System Configurations', icon: 'esc-icons:settings-2', route: '/system-configurations' },
    { title: 'Users Management', icon: 'esc-icons:users', route: '/users-management' },
  ];
}
