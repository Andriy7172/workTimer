import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.credentialsForm = this.formBuilder.group({
      email: this.formBuilder.control(null),
      password: this.formBuilder.control(null)
    });
  }

  submit(): void {
    const { email, password } = this.credentialsForm.value;
    this.config[this.action].method(email, password);
  }

  async login(): Promise<void> {
    const { email, password } = this.credentialsForm.value;
    await this.auth.login(email, password);
  }

  openRegisterForm(): void {
    this.action = 'REGISTER';
  }

}
