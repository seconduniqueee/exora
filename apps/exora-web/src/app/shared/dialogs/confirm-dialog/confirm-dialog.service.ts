import { Injectable } from "@angular/core";
import { DialogService } from "../../../core/dialog/dialog.service";
import { ConfirmDialogComponent } from "@exora-web/shared/dialogs/confirm-dialog/confirm-dialog.component";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class ConfirmDialogService {
  constructor(private dialogService: DialogService) {}

  async confirm(
    title: string,
    message: string,
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
  ): Promise<boolean> {
    let result: Observable<boolean> = this.dialogService.open(ConfirmDialogComponent, {
      width: "500px",
      data: { title, message, confirmButtonText, cancelButtonText },
    });

    return firstValueFrom(result);
  }
}
