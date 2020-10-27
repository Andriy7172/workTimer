import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(private fireService: FirestoreService) { }

  ngOnInit(): void {
    this.fireService.tasks.READ().subscribe(data => this.tasks = data as Task[]);
  }

  deleteTask(startTime: number): void {
    this.fireService.tasks.DELETE(startTime).then(data => console.log(data));
  }

}
