
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // estado interno de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private readonly STORAGE_KEY = 'petcare_logged_user';

  constructor() {
    // al iniciar el servicio, revisa si hay usuario guardado
    const user = localStorage.getItem(this.STORAGE_KEY);
    if (user) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string) {
    // aquí podrías validar contra algo real; por ahora cualquier email es válido
    localStorage.setItem(this.STORAGE_KEY, email);
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }
}
