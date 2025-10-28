import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { API_URLS } from '../../../public/utils/API_URLS';
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({
    providedIn: 'root',
})
export class lookupService {
    http = inject(HttpClient);
    router = inject(Router);
    notification = inject(NzNotificationService);


    addResult = signal<any>(null);
    getByIdResult = signal<any>(null);
    deleteResult = signal<any>(null);
    editResult = signal<any>(null);

    add(data: any): void {
        this.http.post(API_URLS.terminals.add, data).subscribe({
            next: (response) => this.addResult.set(response),
            error: (err) => console.error('Add lookup failed', err)
        });
    }

    getById(id: any): void {
        this.http.get(API_URLS.terminals.getById.replace('{id}', id)).subscribe({
            next: (response) => this.getByIdResult.set(response),
            error: (err) => console.error('Get lookup failed', err)
        });
    }

    delete(id: string): void {
        this.http.delete(API_URLS.terminals.delete.replace('{id}', id)).subscribe({
            next: (response) => this.deleteResult.set(response),
            error: (err) => console.error('Delete lookup failed', err)
        });
    }

    edit(id: any, data: any): void {
        this.http.put(API_URLS.terminals.edit.replace('{id}', id), data).subscribe({
            next: (response) => {
                this.editResult.set(response);
                this.notification.success(
                    ``,
                    'Lookup updated successfully'
                );
                this.router.navigate(['/basic-data']);
            },
            error: (err) => {
                this.editResult.set(null);
                this.notification.error(
                    ``,
                    'Failed to update. Please try again.'
                );
                console.error('Edit lookup failed', err);
            }
        });
    }
}