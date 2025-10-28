import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconsService {
  /**
   * Constructor
   */
  constructor() {
    const domSanitizer = inject(DomSanitizer);
    const matIconRegistry = inject(MatIconRegistry);

    // Register icon sets
    matIconRegistry.addSvgIconSetInNamespace(
      'esc-icons',
      domSanitizer.bypassSecurityTrustResourceUrl('icons/esc-icons.svg')
    );
    matIconRegistry.addSvgIconSetInNamespace(
      'mat_outline',
      domSanitizer.bypassSecurityTrustResourceUrl('icons/material-outline.svg')
    );
  }
}
