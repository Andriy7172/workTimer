import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  readonly tasks = {
    CREATE: (task: Task) => this.db.collection('projects/workTimer/tasks').doc(`${task.taskNumber}`).set({...task}),
    READ: () => this.db.collection('projects/workTimer/tasks').snapshotChanges().pipe(map(value => {
      return value.map(item => item.payload.doc.data());
    })),
  };

  constructor(private db: AngularFirestore) { }
}
