
import { HttpClient } from '@angular/common/http';


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Mascota {
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  notas: string;
  imagen?: string;
}

export interface Vacuna {
  id: number;
  nombre: string;
  fecha: string;      // ISO string
  aplicada: boolean;
}

export interface Cita {
  id: number;
  motivo: string;
  fecha: string;      // ISO string
  lugar: string;
  realizada: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PetService {

  private readonly PET_KEY = 'petcare_mascota';
  private readonly VACUNAS_KEY = 'petcare_vacunas';
  private readonly CITAS_KEY = 'petcare_citas';

  // Subjects con estado en memoria
  private mascotaSubject = new BehaviorSubject<Mascota | null>(null);
  mascota$ = this.mascotaSubject.asObservable();

  private vacunasSubject = new BehaviorSubject<Vacuna[]>([]);
  vacunas$ = this.vacunasSubject.asObservable();

  private citasSubject = new BehaviorSubject<Cita[]>([]);
  citas$ = this.citasSubject.asObservable();

  constructor() {
    this.cargarDesdeStorage();
  }

  // ================== CARGA INICIAL ==================
  private cargarDesdeStorage() {
    // Mascota
    const petJson = localStorage.getItem(this.PET_KEY);
    if (petJson) {
      this.mascotaSubject.next(JSON.parse(petJson));
    } else {
      // Datos por defecto si no hay nada
      const defaultPet: Mascota = {
        nombre: 'Luna',
        especie: 'Perro',
        raza: 'Mestizo',
        edad: 3,
        peso: 12.5,
        notas: 'Muy juguetona y sociable.',
      };
      this.setMascota(defaultPet);
    }

    // Vacunas
    const vacunasJson = localStorage.getItem(this.VACUNAS_KEY);
    if (vacunasJson) {
      this.vacunasSubject.next(JSON.parse(vacunasJson));
    } else {
      const defaultVacunas: Vacuna[] = [
        { id: 1, nombre: 'Antirrábica', fecha: '2025-01-10', aplicada: true },
        { id: 2, nombre: 'Parvovirus', fecha: '2025-03-15', aplicada: true },
        { id: 3, nombre: 'Refuerzo anual', fecha: '2025-11-20', aplicada: false },
      ];
      this.setVacunas(defaultVacunas);
    }

    // Citas
    const citasJson = localStorage.getItem(this.CITAS_KEY);
    if (citasJson) {
      this.citasSubject.next(JSON.parse(citasJson));
    } else {
      const defaultCitas: Cita[] = [
        { id: 1, motivo: 'Control general', fecha: '2025-02-01', lugar: 'Clínica Vet Central', realizada: true },
        { id: 2, motivo: 'Vacuna refuerzo', fecha: '2025-11-20', lugar: 'Clínica Vet Central', realizada: false },
      ];
      this.setCitas(defaultCitas);
    }
  }

  // ================== MASCOTA ==================
  setMascota(mascota: Mascota) {
    this.mascotaSubject.next(mascota);
    localStorage.setItem(this.PET_KEY, JSON.stringify(mascota));
  }

  getMascota(): Mascota | null {
    return this.mascotaSubject.value;
  }

  // ================== VACUNAS ==================
  setVacunas(vacunas: Vacuna[]) {
    this.vacunasSubject.next(vacunas);
    localStorage.setItem(this.VACUNAS_KEY, JSON.stringify(vacunas));
  }

  addVacuna(vacuna: Vacuna) {
    const actuales = this.vacunasSubject.value;
    const nuevas = [...actuales, vacuna];
    this.setVacunas(nuevas);
  }

  // ================== CITAS ==================
  setCitas(citas: Cita[]) {
    this.citasSubject.next(citas);
    localStorage.setItem(this.CITAS_KEY, JSON.stringify(citas));
  }

  addCita(cita: Cita) {
    const actuales = this.citasSubject.value;
    const nuevas = [...actuales, cita];
    this.setCitas(nuevas);
  }
}
