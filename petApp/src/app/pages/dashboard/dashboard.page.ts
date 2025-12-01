import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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
  mascota = {
    nombre: 'Luna',
    especie: 'Perro',
    edad: 3,
    proximaVacuna: '19-11-2025',
    saludGeneral: 0.8 // 80%
  };


  constructor(
  private router: Router,
  private authService: AuthService
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
}

cerrarSesion() {
  this.authService.logout();
  this.router.navigate(['/login']);
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


toggleDarkMode(event: any) {
  if (event.detail.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}


}
