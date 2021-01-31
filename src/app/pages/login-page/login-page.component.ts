import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.credentialsForm = this.formBuilder.group({
      email: this.formBuilder.control(null),
      password: this.formBuilder.control(null)
    });
  }

  async signIn(): Promise<void> {
    const { email, password } = this.credentialsForm.value;
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<void> {
    const credentials = await this.auth.signInWithEmailAndPassword(email, password);
    console.log(credentials);
  }

}
