import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    // Estrategia de rutas propia de Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Ionic standalone
    provideIonicAngular(),

    // Router con precarga (puedes sacar withPreloading si quieres)
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // HttpClient para API REST
    provideHttpClient(),

    // Ionic Storage integrado en modo standalone
    importProvidersFrom(IonicStorageModule.forRoot())
  ],
});
