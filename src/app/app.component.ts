import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    Notification.requestPermission();

    this.auth.user.subscribe(user => {
      console.log(user);
    });
  }

}
