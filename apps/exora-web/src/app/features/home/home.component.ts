import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { RandomDialogComponent } from "../random-dialog/random-dialog.component";
import { DialogService } from "../../core/dialog/dialog.service";
import { RandomDialogResult } from "../random-dialog/random-dialog.model";
import { firstValueFrom } from "rxjs";

@Component({
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  providers: [DialogService, AuthService],
  standalone: true,
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    return this.authService.userInfo.firstName;
  }

  async openRandomDialog(): Promise<void> {
    let ref = this.dialogService.open(RandomDialogComponent, {
      width: "500px",
      data: {
        title: "Get Answer To Everything",
        submitButtonText: "Submit",
        cancelButtonText: "Cancel",
        content: `
          In a vast universe filled with questions,
          one answer stands as the key to everything.
          After much searching and contemplation,
          the truth is finally revealed — the answer to life,
          the universe, and everything.`,
      },
    });

    let result = (await firstValueFrom(ref)) as RandomDialogResult;

    console.log("Got RandomDialog result: ", result);
  }
}
