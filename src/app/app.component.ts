import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  seconds = 0;
  timerSubscription: Subscription;
  startDisabled = false;
  pauseDisabled = true;

  startTimer(): void {
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription = interval(1000).subscribe(() => this.seconds += 1);
  }

  pauseTimer(): void {
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription.unsubscribe();
  }
}
