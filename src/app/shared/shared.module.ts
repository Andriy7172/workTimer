import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  imports: [
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatBottomSheetModule,
  ],
  exports: [
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatBottomSheetModule,
  ],
})
export class SharedModule { }
