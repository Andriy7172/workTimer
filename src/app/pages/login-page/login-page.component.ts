import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public action: 'LOGIN' | 'REGISTER' = 'LOGIN';
  public credentialsForm: FormGroup;
  public config = {
    LOGIN: {
      label: 'Login',
      method: async (email: string, password: string) => await this.auth.login(email, password)
    },
    REGISTER: {
      label: 'Register',
      method: async (email: string, password: string) => await this.auth.register(email, password)
    }
  };

  // TODO: Refactor code for login page
  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private fire: FirestoreService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.credentialsForm = this.formBuilder.group({
      email: this.formBuilder.control(null),
      password: this.formBuilder.control(null)
    });
  }

  async submit(): Promise<void> {
    const { email, password } = this.credentialsForm.value;
    const userCredential = await this.config[this.action].method(email, password);
    // console.log(userCredential.user.uid);

    if (this.action === 'REGISTER') {
      await this.fire.createUserDocument(userCredential.user.uid);
      const dialogRef = this.dialog.open(UserDetailsFormComponent);

      const userName = await dialogRef.afterClosed().toPromise();
      console.log(userName);
      this.fire.createUserName(userCredential.user.uid, userName)
    }
  }

  async login(): Promise<void> {
    const { email, password } = this.credentialsForm.value;
    const userCredential = await this.auth.login(email, password);
  }

  openRegisterForm(): void {
    this.action = 'REGISTER';
  }

}
