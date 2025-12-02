import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';

import { Router } from '@angular/router';




import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonIcon,
  

} from '@ionic/angular/standalone';

import { PetApiCacheService, PetApiItem } from 'src/app/services/pet-api-cache.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.page.html',
  styleUrls: ['./pets-list.page.scss'],
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    NgIf,
    NgForOf,

    // Ionic components usados en el HTML
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonButton,
    IonIcon,
  ],
})
export class PetsListPage implements OnInit {

  pets: PetApiItem[] = [];
  loading = false;

  constructor(private petApiCache: PetApiCacheService, private router: Router) {}

  volverAlDashboard() {
  this.router.navigate(['/dashboard']);
}


  ngOnInit() {
    // Suscribirse al estado global de la lista
    this.petApiCache.petsObservable$.subscribe(pets => {
      this.pets = pets;
    });

    // Cargar desde API / cache
    this.refresh();
  }

  refresh(event?: any) {
    this.loading = true;

    this.petApiCache.loadFromApi().subscribe({
      next: () => {
        this.loading = false;
        if (event) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event) event.target.complete();
      },
    });
  }
}
