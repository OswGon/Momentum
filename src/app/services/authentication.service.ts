import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth: AngularFireAuth) {}

  // Registro de usuario con manejo de errores
  async registerUser(email: string, password: string) {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail(); // Enviar el correo de verificación después del registro
      return userCredential.user;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  // Inicio de sesión con manejo de errores
  async loginUser(email: string, password: string): Promise<any> {
    try {
      return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Restablecer contraseña con manejo de errores
  async resetPassword(email: string): Promise<any> {
    try {
      return await this.ngFireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Cerrar sesión
  async signOut(): Promise<void> {
    try {
      return await this.ngFireAuth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Obtener el perfil del usuario actual
  async getProfile(): Promise<firebase.User | null> {
    try {
      return await this.ngFireAuth.currentUser;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      return null;
    }
  }
  async sendVerificationEmail() {
    const user = await this.ngFireAuth.currentUser;
    if (user) {
      return user.sendEmailVerification(); // Envía el correo de verificación
    } else {
      console.error('No se encontró el usuario para enviar el correo de verificación.');
    }
  }

  // Método privado para manejar errores de autenticación
  private handleError(error: any): Promise<any> {
    let errorMessage: string;

    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Usuario no encontrado. Verifica tu correo.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Contraseña incorrecta. Intenta nuevamente.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'Este correo ya está en uso. Usa otro correo o inicia sesión.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'El correo no es válido. Verifícalo e inténtalo de nuevo.';
        break;
      case 'auth/weak-password':
        errorMessage = 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
        break;
      default:
        errorMessage = 'Error inesperado. Intenta de nuevo.';
    }

    return Promise.reject(errorMessage); // Retorna el mensaje de error al componente que lo llamo
  }
}
