
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface PetApiItem {
  id: number;
  name: string;
  type: string;
  email: string;
}

const PETS_API_KEY = 'petcare_pets_api';

@Injectable({
  providedIn: 'root'
})
export class PetApiCacheService {

  private pets$ = new BehaviorSubject<PetApiItem[]>([]);
  petsObservable$ = this.pets$.asObservable();

  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private storageReady = false;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.storageReady = true;

    const cached = await this.storage.get(PETS_API_KEY);
    if (cached) {
      this.pets$.next(cached);
    }
  }

  loadFromApi() {
    return this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
      map(users => users.map(u => ({
        id: u.id,
        name: u.name,
        type: 'Perro',
        email: u.email
      }) as PetApiItem)),
      tap(async pets => {
        this.pets$.next(pets);
        if (this.storageReady) {
          await this.storage.set(PETS_API_KEY, pets);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error API, uso de cache local', err);

        if (!this.storageReady) {
          return of([]);
        }

        return from(this.storage.get(PETS_API_KEY)).pipe(
          tap(cached => {
            if (cached) {
              this.pets$.next(cached);
            }
          }),
          map(cached => cached || [])
        );
      })
    );
  }
}
