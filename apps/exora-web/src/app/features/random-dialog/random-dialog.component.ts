import { Component, Inject } from "@angular/core";
import { DIALOG_DATA } from "../../core/tokens/dialog-data.token";
import { RandomDialogData } from "./random-dialog.model";

@Component({
  selector: "app-random-dialog",
  templateUrl: "random-dialog.component.html",
  styleUrl: "random-dialog.component.scss",
  standalone: true,
})
export class RandomDialogComponent {
  constructor(@Inject(DIALOG_DATA) public dialogData: RandomDialogData) {}

  alertSomething(alertText: string): void {
    alert(alertText);
  }
}
