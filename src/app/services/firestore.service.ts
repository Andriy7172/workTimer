import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  readonly tasks = {
    CREATE: (task: Task) => this.db.collection('projects/workTimer/tasks').doc(`${task.startTime}`).set({...task}),
    READ: () => this.db.collection('projects/workTimer/tasks').snapshotChanges().pipe(map(value => {
      return value.map(item => item.payload.doc.data());
    })),
    DELETE: (startTime: number) => this.db.collection('projects/workTimer/tasks').doc(`${startTime}`).delete()
  };

  readonly workingDayDuration = {
    UPDATE: (timeInSeconds: number) => this.db.doc('projects/workTimer').update({ timeInSeconds }),
    READ: () => this.db.doc<{name: string, timeInSeconds: number}>('projects/workTimer').snapshotChanges()
      .pipe(
        map(value => value.payload.data()),
        map(projectInfo => projectInfo.timeInSeconds),
      ),
  };

  createUserDocument(uid: string): Promise<void> {
    return this.db.collection('projects').doc('workTimer').collection('users').doc(uid).set({uid});
  }

  createUserName(uid: string, userName: string): Promise<void> {
    return this.db.collection('projects').doc('workTimer').collection('users').doc(uid).update({userName})
  }

  constructor(private db: AngularFirestore) { }
}
