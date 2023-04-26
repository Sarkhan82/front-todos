import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModalModel
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(m?: string): void {
    this.dialogRef.close(false);
  }

}
export class ConfirmModalModel {
  constructor(public title: string, public message: string) { }
}

