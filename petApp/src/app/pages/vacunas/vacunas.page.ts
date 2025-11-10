import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Vacuna {
  nombre: string;
  fecha: Date;
  aplicada: boolean;
}

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.page.html',
  styleUrls: ['./vacunas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class VacunasPage {

  vacunas: Vacuna[] = [
    { nombre: 'Rabia',          fecha: new Date(2025, 9, 10), aplicada: true },
    { nombre: 'Óctuple',       fecha: new Date(2025, 10, 5), aplicada: false },
    { nombre: 'Desparasitación', fecha: new Date(2025, 11, 1), aplicada: false }
  ];

}
