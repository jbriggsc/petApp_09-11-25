import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.page.html',
  styleUrls: ['./mascota.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MascotaPage {

  mascota = {
    nombre: 'Luna',
    especie: 'Perro',
    raza: 'Mestizo',
    edad: 3,
    pesoKg: 12.5,
    observaciones: 'Muy activa, sin alergias conocidas'
  };

}
