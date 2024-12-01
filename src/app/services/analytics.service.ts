import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor() {
    FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
  }

  logEvent(name: string, params: any) {
    FirebaseAnalytics.logEvent({ name, params });
  }
}
