import { Component, Inject } from "@angular/core";
import { DIALOG_DATA } from "../../../core/tokens/dialog-data.token";
import { ConfirmDialogData } from "@exora-web/shared/dialogs/confirm-dialog/confirm-dialog.model";
import { DialogRef } from "../../../core/dialog/dialog.model";

@Component({
  templateUrl: "confirm-dialog.component.html",
  standalone: true,
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public dialogData: ConfirmDialogData,
    private dialogRef: DialogRef<boolean>,
  ) {}

  confirm(): void {
    this.dialogRef.closeDialog(true);
  }

  cancel(): void {
    this.dialogRef.closeDialog(false);
  }
}
