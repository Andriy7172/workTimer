import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.credentialsForm = this.formBuilder.group({
      email: this.formBuilder.control(null),
      password: this.formBuilder.control(null)
    });
  }

  async login(): Promise<void> {
    const { email, password } = this.credentialsForm.value;
    await this.auth.login(email, password);
  }

}
