import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
export interface Breadcrumb {
  label?: string;
  url?: string;
  icon?: string;
}
@Component({
  selector: 'bread-crumb',
  imports:[CommonModule,RouterModule, MatIconModule],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Input() breadcrumbs: Breadcrumb[] = [];
  constructor() { }

  ngOnInit() {
  }

}
