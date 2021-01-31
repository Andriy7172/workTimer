import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly userLoggedIn = new BehaviorSubject<boolean>(false);
  readonly userLoggedInObservable = this.userLoggedIn.asObservable();

  constructor() { }
}
