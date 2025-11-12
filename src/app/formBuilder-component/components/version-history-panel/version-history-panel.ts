import { Component, inject } from '@angular/core';
import { CanvasStateService } from '../../services/canvas.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { VersionHistoryService } from '../../services/version-history.service';

@Component({
  selector: 'version-history-panel',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './version-history-panel.html',
  styleUrl: './version-history-panel.scss'
})
export class VersionHistoryPanel {
  versionHistory = inject(VersionHistoryService);
  canvasService = inject(CanvasStateService);
}
