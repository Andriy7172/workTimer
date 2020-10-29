import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-working-day-duration-editor',
  templateUrl: './working-day-duration-editor.component.html',
  styleUrls: ['./working-day-duration-editor.component.scss']
})
export class WorkingDayDurationEditorComponent implements OnInit {
  public timeGroup = new FormGroup({
    hour: new FormControl(8),
    minutes: new FormControl(0),
  });

  constructor(
    private dialogRef: MatDialogRef<WorkingDayDurationEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.fireService.workingDayDuration.READ()
      .subscribe(timeInSeconds => {
        const time = new Date(timeInSeconds * 1000);
        const hour = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        this.timeGroup.setValue({ hour, minutes });
      });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  async onConfirmClick(): Promise<void> {
    const { hour, minutes } = this.timeGroup.value;
    const timeInSeconds = (hour * 60 * 60) + (minutes * 60);
    await this.fireService.workingDayDuration.UPDATE(timeInSeconds);
    this.dialogRef.close();
  }

}
