import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BreadCrumbComponent } from '../shared/bread-crumb/bread-crumb.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BasicdataList } from './components/basicdata-list/basicdata-list';
@Component({
  selector: 'app-basicdata-component',
  imports: [
    CommonModule,
    BreadCrumbComponent,
    MatButtonModule,
    MatIconModule,
    BasicdataList
  ],
  templateUrl: './basicdata-component.html',
  styleUrl: './basicdata-component.scss'
})
export class BasicdataComponent {
  router = inject(Router)
  onAddLookup() {
    this.router.navigate(['/basic-data/add']);
  }
}
