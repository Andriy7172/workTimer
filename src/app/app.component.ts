import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Task } from './models/task.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from './services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { WorkingDayDurationEditorComponent } from './components/working-day-duration-editor/working-day-duration-editor.component';

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
  taskStartTime: number;
  timeZoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;

  taskGroup = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required],
    }),
    description: new FormControl(null, {
      validators: [Validators.required],
    }),
    startTime: new FormControl(null),
    duration: new FormControl(null),
  });

  subscription: Subscription;

  constructor(
    private fireService: FirestoreService,
    private dialog: MatDialog,
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
    this.taskStartTime = new Date().getTime();
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
    this.addNewTask = true;
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription.unsubscribe();
  }

  refreshTimer(): void {
    this.milliseconds = this.initialTimeMilliseconds;
  }

  submit(): void {
    const currentTime = new Date().getTime();
    const duration = currentTime - this.taskStartTime;
    this.taskGroup.patchValue({startTime: this.taskStartTime, duration});
    const task = new Task(
      this.taskGroup.value.title,
      this.taskGroup.value.description,
      this.taskGroup.value.startTime,
      this.taskGroup.value.duration
    );
    this.fireService.tasks.CREATE(task).then(value => console.log(value));
    this.taskGroup.reset();
    this.addNewTask = false;
  }

  cancel(): void {
    this.taskGroup.reset();
    this.addNewTask = false;
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
