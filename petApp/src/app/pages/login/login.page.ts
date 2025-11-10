import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {

  user = {
    email: '',
    password: ''
  };

  mensajeError = '';

  constructor(private router: Router) {}

  ingresar() {
    if (this.user.email && this.user.password) {
      this.mensajeError = '';
      this.router.navigate(['/dashboard'], {
        state: { nombreUsuario: this.user.email }
      });
    } else {
      this.mensajeError = 'Debe ingresar correo y contraseña.';
    }
  }
}
