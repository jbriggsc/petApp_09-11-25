import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'mascota',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/mascota/mascota.page').then(m => m.MascotaPage)
  },
  {
    path: 'vacunas',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/vacunas/vacunas.page').then(m => m.VacunasPage)
  },
  {
    path: 'citas',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/citas/citas.page').then(m => m.CitasPage)
  },
  {
    path: 'pets-list',
    loadComponent: () => import('./pages/pets-list/pets-list.page').then( m => m.PetsListPage)
  },
  
  
  //ruta 404
  // { path: '**', loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage) },
];
