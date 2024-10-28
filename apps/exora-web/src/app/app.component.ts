import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppService } from "./app.service";
import { LayoutComponent } from "./features/layout/layout.component";
import { HomeComponent } from "./features/home/home.component";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent, HomeComponent],
  selector: "app-root",
  providers: [AppService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  appName = "Exora Web";
  resultMessage: string;

  constructor(private service: AppService) {}

  async signIn(): Promise<void> {
    let result = await this.service.logIn("test@test.com", "Qwerty123");
    this.resultMessage = "Logged In";

    localStorage.setItem("access_token", result.tokens.accessToken);
    console.log(result);
  }

  reset(): void {
    this.resultMessage = null;
  }
}
