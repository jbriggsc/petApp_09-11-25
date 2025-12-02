import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { CameraService } from 'src/app/services/camera.service';
import { Storage } from '@ionic/storage-angular';   // si quieres guardar la foto

import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';






@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.page.html',
  styleUrls: ['./mascota.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, IonButton,
IonIcon,
IonItem,
IonLabel,
IonContent,
IonHeader,
IonToolbar,
IonTitle,
],
})
export class MascotaPage {

  mascota = {
    nombre: 'Luna',
    especie: 'Perro',
    raza: 'Mestizo',
    edad: 3,
    pesoKg: 12.5,
    observaciones: 'Muy activa, sin alergias conocidas',
    imagen: '',
  };


constructor(
  private cameraService: CameraService,
  private storage: Storage
) {}


async tomarFoto() {
  const foto = await this.cameraService.takePhoto();

  if (foto) {
    this.mascota.imagen = foto;       // mostrarla en la app

    await this.storage.set('pet_foto', foto);   // guardarla si quieres persistencia
  }
}


async ngOnInit() {
  const fotoGuardada = await this.storage.get('pet_foto');
  if (fotoGuardada) {
    this.mascota.imagen = fotoGuardada;
  }
}


}

