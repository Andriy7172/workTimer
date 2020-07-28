import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  seconds = 0;
  hours = '';
  timerSubscription: Subscription;
  startDisabled = false;
  pauseDisabled = true;
  workDayDurationInHours = 8;

  ngOnInit(): void {
    Notification.requestPermission();
  }

  startTimer(): void {
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription = interval(1000).subscribe(() => {
      this.seconds += 1;
      const hours = this.seconds % 360;
      const minutes = this.seconds % 60;
      if (this.seconds === 10) {
        const not = new Notification('End of the work day');
      }
    });
  }

  pauseTimer(): void {
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription.unsubscribe();
  }

  refreshTimer(): void {
    this.seconds = 0;
  }
}
