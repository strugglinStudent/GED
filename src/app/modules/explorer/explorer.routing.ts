import { Route } from '@angular/router';
import { ExplorerComponent } from './explorer.component';

export const explorerRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    component: ExplorerComponent,
  },
];
