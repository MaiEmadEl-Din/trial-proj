// version-history.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanvasStateService } from './canvas.service';

@Injectable({ providedIn: 'root' })
export class VersionHistoryService {
    private http = inject(HttpClient);
    private baseUrl = '/api/form-versions';

    // canvasService = inject(CanvasStateService)

    versionHistory = signal<any[]>([
        {
            "fields": [
                {
                    "type": "text",
                    "label": "Text Field",
                    "props": {
                        "placeholder": "Enter text"
                    },
                    "styles": {
                        "backgroundColor": "#a8a8a8",
                        "color": "#ffffff",
                        "fontWeight": "700",
                        "fontFamily": "cursive",
                    },
                    "order": 0
                }
            ],
            "styles": {
                "backgroundColor": "#ffffff",
                "fontFamily": "cairo",
                "alignment": "justify-center",
                "gridColumns": "grid-cols-1"
            },
            version: 'Version 1', date: '20 mins ago'
        },
        {
            "fields": [
                {
                    "type": "text",
                    "label": "Text Field",
                    "props": {
                        "placeholder": "Enter text"
                    },
                    "styles": {
                        "backgroundColor": "#ffe3e0"
                    },
                    "order": 0
                },
                {
                    "type": "button",
                    "label": "Button",
                    "styles": {
                        "backgroundColor": "#f7a1a1"
                    },
                    "order": 1
                }
            ],
            "styles": {
                "backgroundColor": "#ffffff",
                "fontFamily": "cairo",
                "alignment": "justify-center",
                "gridColumns": "grid-cols-1"
            },
            version: 'Version 2', date: '30 mins ago'
        }
    ]);

    restoreVersion(index: number, canvasService: CanvasStateService) {
        const version = this.versionHistory()[index];
        if (!version) return;

        // Save current state to undo before restoring
        canvasService.saveStateSnapshot();

        // Restore form + fields
        canvasService.canvasItems.set(structuredClone(version.fields));
        canvasService.formStyles.set(structuredClone(version.styles));
        // Clear editing states
        canvasService.clearEditor();
    }



    isVersionHistoryOpen = signal(false);
    openVersionHistory() {
        this.isVersionHistoryOpen.set(true);
    }
    closeVersionHistory() {
        this.isVersionHistoryOpen.set(false);
    }
    toggleVersionHistory() {
        this.isVersionHistoryOpen.update(v => !v);
    }

    getVersions(formId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/${formId}`);
    }

    saveVersion(formId: string, payload: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${formId}`, payload);
    }

    // restoreVersion(versionId: string): Observable<any> {
    //     return this.http.get<any>(`${this.baseUrl}/restore/${versionId}`);
    // }
}
