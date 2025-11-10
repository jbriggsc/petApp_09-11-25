import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Cita {
  motivo: string;
  fecha: Date;
  lugar: string;
  realizada: boolean;
}

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CitasPage {

  citas: Cita[] = [
    { motivo: 'Control anual', fecha: new Date(2025, 9, 20), lugar: 'Vet Central',  realizada: true },
    { motivo: 'Vacuna refuerzo', fecha: new Date(2025, 10, 15), lugar: 'PetClinic', realizada: false },
    { motivo: 'Chequeo dental', fecha: new Date(2026, 0, 10), lugar: 'Vet Smile',   realizada: false }
  ];

}
