import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  register(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password).then(data => console.log(data));
  }
}
