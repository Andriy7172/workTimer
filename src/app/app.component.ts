import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '';
  addNewTask = false;
  hours = '';
  timeZoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;


  constructor(
    private auth: AngularFireAuth,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    Notification.requestPermission();

    this.auth.user.subscribe(user => {
      this.data.userLoggedIn.next(!!user);
      if (user) {
        this.router.navigateByUrl('');
      } else {
        this.router.navigateByUrl('login');
      }
    });
  }

}
