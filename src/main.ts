import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { App } from './app/app';

ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
