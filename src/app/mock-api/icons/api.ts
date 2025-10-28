import { Injectable } from '@angular/core';
import { FuseMockApiService } from '../mock-api.service';

@Injectable({ providedIn: 'root' })
export class IconsMockApi {
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    this._fuseMockApiService.onGet('api/ui/icons/esc-icons').reply(() => [
      200,
      {
        namespace: 'esc-icons',
        name: 'ESC Icons',
        grid: 'icon-size-6',
      },
    ]);
  }
}
