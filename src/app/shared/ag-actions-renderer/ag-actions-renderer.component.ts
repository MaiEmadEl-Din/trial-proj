import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'ag-actions-renderer',
  imports:[CommonModule,MatIconModule,MatMenuModule,MatButtonModule ],
  templateUrl: './ag-actions-renderer.component.html',
  styleUrls: ['./ag-actions-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgActionsRendererComponent implements ICellRendererAngularComp{
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  params: any;
  actions: string[] = [];

  agInit(params: any): void {
    this.params = params;
    this.actions = params.actions || [];
  }

  onActionClick(action: string): void {
    console.log('action', action);

    if (this.params.onActionClick) {
      this.params.onActionClick(action, this.params.data);
    }
  }
}
