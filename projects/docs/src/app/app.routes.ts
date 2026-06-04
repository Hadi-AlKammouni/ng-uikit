import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent),
    title: 'Ng-UIKit — accessible Angular component library',
  },
  {
    path: 'tokens',
    loadComponent: () => import('./pages/tokens.component').then((m) => m.TokensComponent),
    title: 'Tokens · Ng-UIKit',
  },
  {
    path: 'button',
    loadComponent: () => import('./pages/button-docs.component').then((m) => m.ButtonDocsComponent),
    title: 'Button · Ng-UIKit',
  },
  {
    path: 'input',
    loadComponent: () => import('./pages/input-docs.component').then((m) => m.InputDocsComponent),
    title: 'Input · Ng-UIKit',
  },
  {
    path: 'modal',
    loadComponent: () => import('./pages/modal-docs.component').then((m) => m.ModalDocsComponent),
    title: 'Modal · Ng-UIKit',
  },
  {
    path: 'toast',
    loadComponent: () => import('./pages/toast-docs.component').then((m) => m.ToastDocsComponent),
    title: 'Toast · Ng-UIKit',
  },
  {
    path: 'table',
    loadComponent: () => import('./pages/table-docs.component').then((m) => m.TableDocsComponent),
    title: 'Table · Ng-UIKit',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs-docs.component').then((m) => m.TabsDocsComponent),
    title: 'Tabs · Ng-UIKit',
  },
  { path: '**', redirectTo: '' },
];

export const NAV: { label: string; path: string; section: 'Get started' | 'Components' }[] = [
  { label: 'Overview', path: '/', section: 'Get started' },
  { label: 'Design tokens', path: '/tokens', section: 'Get started' },
  { label: 'Button', path: '/button', section: 'Components' },
  { label: 'Input', path: '/input', section: 'Components' },
  { label: 'Modal', path: '/modal', section: 'Components' },
  { label: 'Toast', path: '/toast', section: 'Components' },
  { label: 'Table', path: '/table', section: 'Components' },
  { label: 'Tabs', path: '/tabs', section: 'Components' },
];
