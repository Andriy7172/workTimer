import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit {
  public userName = new FormControl(null, {validators: [Validators.required]});

  constructor(public dialogRef: MatDialogRef<UserDetailsFormComponent>) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.dialogRef.close(this.userName.value);
  }

}
