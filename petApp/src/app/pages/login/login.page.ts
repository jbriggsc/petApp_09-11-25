
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})







export class LoginPage implements OnInit {

  user = { email: '', password: '' };
  mensajeError = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Cada vez que entro a /login, me aseguro de cerrar sesión
    this.authService.logout();
  }

  ingresar() {
    if (this.user.email && this.user.password) {
      this.mensajeError = '';
      this.authService.login(this.user.email);
      this.router.navigate(['/dashboard'], {
        state: { nombreUsuario: this.user.email }
      });
    } else {
      this.mensajeError = 'Debe ingresar correo y contraseña.';
    }
  }
}
