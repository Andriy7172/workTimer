import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Task } from './models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '';
  addNewTask = false;
  seconds = 0;
  hours = '';
  timerSubscription: Subscription;
  startDisabled = false;
  pauseDisabled = true;
  workDayDurationInHours = 8;
  taskStartTime: number;
  tasks: Task[] = [];

  // TODO: add validation
  taskGroup = new FormGroup({
    taskNumber: new FormControl(null),
    title: new FormControl(null),
    description: new FormControl(null),
    startTime: new FormControl(null),
    duration: new FormControl(null),
  });

  constructor(private fireService: FirestoreService) {}

  ngOnInit(): void {
    this.fireService.tasks.READ().subscribe(data => this.tasks = data as Task[]);
    Notification.requestPermission();
  }

  startTimer(): void {
    this.taskStartTime = new Date().getTime();
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
    this.addNewTask = true;
    this.startDisabled = !this.startDisabled;
    this.pauseDisabled = !this.pauseDisabled;
    this.timerSubscription.unsubscribe();
  }

  refreshTimer(): void {
    this.seconds = 0;
  }

  submit(): void {
    const currentTime = new Date().getTime();
    const duration = currentTime - this.taskStartTime;
    this.taskGroup.patchValue({startTime: this.taskStartTime, duration});
    const task = new Task(
      this.taskGroup.value.taskNumber,
      this.taskGroup.value.title,
      this.taskGroup.value.description,
      this.taskGroup.value.startTime,
      this.taskGroup.value.duration
    );
    this.fireService.tasks.CREATE(task).then(value => console.log(value));
    this.taskGroup.reset();
    this.addNewTask = false;
  }
}
