import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { WorkingDayDurationEditorComponent } from '../../components/working-day-duration-editor/working-day-duration-editor.component';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public workDayDuration: string;
  public milliseconds = 0;
  public startDisabled = false;
  public pauseDisabled = true;
  public initialTimeMilliseconds = 0;

  private subscription: Subscription;
  private timerSubscription: Subscription;

  constructor(
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.fireService.workingDayDuration.READ().subscribe(timeInSeconds => {
      this.workDayDuration = this.secondsToHourMinutes(timeInSeconds);
      this.milliseconds = timeInSeconds * 1000;
      this.initialTimeMilliseconds = timeInSeconds * 1000;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.timerSubscription.unsubscribe();
  }

  openWorkingDayDurationEditor(): void {
    const dialogRef = this.dialog.open(WorkingDayDurationEditorComponent);
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

  secondsToHourMinutes(timeInSeconds: number): string {
    const time = new Date(timeInSeconds * 1000);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    return `${hours}h:${minutes}m`;
  }

  async logout(): Promise<void> {
    await this.auth.logout();
  }
}
