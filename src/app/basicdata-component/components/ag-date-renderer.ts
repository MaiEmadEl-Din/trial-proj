import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-my-status-renderer',
  imports:[MatIconModule],
  template: `
    <div class="flex items-center gap-2 h-full">
      <mat-icon svgIcon="esc-icons:calendar" class="!text-primary-500 !w-5 !h-5"></mat-icon>
      <span class="text-primary-600">{{ params.value ?? '-' }}</span>
    </div>
  `,
})
export class dateRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
