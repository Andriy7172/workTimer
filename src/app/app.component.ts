import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Task } from './models/task.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  addNewTask = false;
  seconds = 0;
  hours = '';
  timerSubscription: Subscription;
  startDisabled = false;
  pauseDisabled = true;
  workDayDurationInHours = 8;
  taskStartTime: number;
  tasks: Task[] = [
    new Task('task one', 'description 1', new Date().getTime(), 10000),
    new Task('task two', 'description 2', new Date().getTime(), 10000),
    new Task('task three', 'description 3', new Date().getTime(), 10000),
  ];
  taskGroup = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    startTime: new FormControl(null),
    duration: new FormControl(null),
  });

  ngOnInit(): void {
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
    // TODO Polish form add cancel, add validation
    const currentTime = new Date().getTime();
    const duration = currentTime - this.taskStartTime;
    this.taskGroup.patchValue({startTime: this.taskStartTime, duration});
    console.log(this.taskGroup.value);
    this.tasks = [
      ...this.tasks,
      new Task(
        this.taskGroup.value.title,
        this.taskGroup.value.description,
        this.taskGroup.value.startTime,
        this.taskGroup.value.duration
      ),
    ];
    this.taskGroup.reset();
    this.addNewTask = false;
  }
}
