import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user_by_id',
        loadComponent: () => import('./pages/user/user.component')
    },
    {
        path: 'akita-store',
        loadComponent: () => import('./pages/akita-store/akita-store.component')
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
