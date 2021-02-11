import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  async login(email: string, password: string): Promise<auth.UserCredential> {
    try {
      return await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  }

  async logout(): Promise<void> {
    await this.fireAuth.signOut();
  }

  async register(email: string, password: string): Promise<auth.UserCredential> {
    try {
      return await this.fireAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  }
}
