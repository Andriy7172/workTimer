import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Task } from '../../models/task.model';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
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

  constructor(
    private bottomSheetRef: MatBottomSheetRef<TaskFormComponent>,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    const startTime = new Date().getTime();
    const duration = 0;
    this.taskGroup.patchValue({startTime, duration});
    const task = new Task(
      this.taskGroup.value.title,
      this.taskGroup.value.description,
      this.taskGroup.value.startTime,
      this.taskGroup.value.duration
    );
    this.fireService.tasks.CREATE(task).then(value => this.bottomSheetRef.dismiss());
    this.taskGroup.reset();
  }

  cancel(): void {
    this.taskGroup.reset();
    this.bottomSheetRef.dismiss();
  }

}
