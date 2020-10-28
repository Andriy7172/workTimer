import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
