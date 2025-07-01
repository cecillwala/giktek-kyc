import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'admin-chat/:chat',
        loadComponent: () => {
            return import('./components/admin/admin.component').then((m) => m.AdminComponent)
        }
    },
    {
        path:'admin-chats',
        loadComponent: () => {
            return import('./components/admin-chats/admin-chats.component').then((m) => m.AdminChatsComponent)
        }
    },
];
