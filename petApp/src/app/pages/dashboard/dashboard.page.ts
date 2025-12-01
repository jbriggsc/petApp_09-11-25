import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PetService, Mascota } from '../../services/pet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardPage {

  nombreUsuario = 'Tutor';
  mascota: Mascota | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private petService: PetService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;
    if (state && state.nombreUsuario) {
      this.nombreUsuario = state.nombreUsuario;
    } else {
      const savedUser = this.authService.getCurrentUser();
      if (savedUser) {
        this.nombreUsuario = savedUser;
      }
    }

    // suscribirse al estado de la mascota
    this.petService.mascota$.subscribe(m => {
      this.mascota = m;
    });
  }

  irAMascota() {
    this.router.navigate(['/mascota']);
  }

  irAVacunas() {
    this.router.navigate(['/vacunas']);
  }

  irACitas() {
    this.router.navigate(['/citas']);
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



toggleDarkMode(event: any) {
  if (event.detail.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}


}
