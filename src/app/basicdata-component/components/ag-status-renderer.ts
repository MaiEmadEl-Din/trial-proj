import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-my-status-renderer',
  imports:[MatIconModule],
  template: `
    <div class="flex items-center gap-1 justify-center !bg-primary-100 rounded-full !w-25 h-6">
      <mat-icon svgIcon="esc-icons:dot" class="!w-3 !h-3"></mat-icon>
      <span class="text-primary-600">{{ params.value ?? '-' }}</span>
    </div>
  `,
})
export class statusRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
