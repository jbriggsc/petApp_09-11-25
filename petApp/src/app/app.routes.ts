import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'mascota',
    loadComponent: () => import('./pages/mascota/mascota.page').then( m => m.MascotaPage)
  },
  {
    path: 'vacunas',
    loadComponent: () => import('./pages/vacunas/vacunas.page').then( m => m.VacunasPage)
  },
  {
    path: 'citas',
    loadComponent: () => import('./pages/citas/citas.page').then( m => m.CitasPage)
  },
];
