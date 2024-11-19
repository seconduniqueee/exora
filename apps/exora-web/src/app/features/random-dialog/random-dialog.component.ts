import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { DIALOG_DATA } from "../../core/tokens/dialog-data.token";
import { RandomDialogData, RandomDialogResult } from "./random-dialog.model";
import { DialogRef } from "../../core/modal/dialog.model";

@Component({
  selector: "app-random-dialog",
  templateUrl: "random-dialog.component.html",
  styleUrl: "random-dialog.component.scss",
  standalone: true,
})
export class RandomDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DIALOG_DATA) public dialogData: RandomDialogData,
    private dialogRef: DialogRef<RandomDialogResult>,
  ) {}

  submit(): void {
    this.dialogRef.closeDialog({ answerToEverything: 42 });
  }

  cancel(): void {
    this.dialogRef.closeDialog(null);
  }

  ngOnInit(): void {
    console.log("Test component lifecycle: OnInit");
  }

  ngOnDestroy(): void {
    console.log("Test component lifecycle: OnDestroy");
  }
}
