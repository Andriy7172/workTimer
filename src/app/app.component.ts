import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Task } from './models/task.model';
import { FirestoreService } from './services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { WorkingDayDurationEditorComponent } from './components/working-day-duration-editor/working-day-duration-editor.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  addNewTask = false;
  initialTimeMilliseconds = 0;
  milliseconds = 0;
  hours = '';
  timerSubscription: Subscription;
  startDisabled = false;
  pauseDisabled = true;
  workDayDuration: string;
  timeZoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;

  subscription: Subscription;

  constructor(
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    Notification.requestPermission();
    this.subscription = this.fireService.workingDayDuration.READ().subscribe(timeInSeconds => {
      this.workDayDuration = this.secondsToHourMinutes(timeInSeconds);
      this.milliseconds = timeInSeconds * 1000;
      this.initialTimeMilliseconds = timeInSeconds * 1000;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.timerSubscription.unsubscribe();
  }

  startTimer(): void {
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription = interval(1000).subscribe(() => {
      this.milliseconds -= 1000;
      if (this.milliseconds === 0) {
        const not = new Notification('End of the work day');
        this.timerSubscription.unsubscribe();
        this.milliseconds = this.initialTimeMilliseconds;
        this.startDisabled = false;
        this.pauseDisabled = true;
      }
    });
  }

  pauseTimer(): void {
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription.unsubscribe();
  }

  refreshTimer(): void {
    this.milliseconds = this.initialTimeMilliseconds;
  }

  openTaskCreationForm(): void {
    this.bottomSheet.open(TaskFormComponent);
  }

  openWorkingDayDurationEditor(): void {
    const dialogRef = this.dialog.open(WorkingDayDurationEditorComponent);
  }

  secondsToHourMinutes(timeInSeconds: number): string {
    const time = new Date(timeInSeconds * 1000);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    return `${hours}h:${minutes}m`;
  }
}
