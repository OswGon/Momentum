import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ReminderService } from './services/reminder.service';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     HttpClientModule,
     IonicStorageModule.forRoot(),
     AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase
    AngularFireAuthModule, // Módulo de autenticación
    FormsModule,
    ],
  providers: [{
     provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    ReminderService,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Inicializa la app de Firebase
    provideAuth(() => getAuth()), // Provee la autenticación
    provideFirestore(() => getFirestore()), // Provee Firestore

  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
