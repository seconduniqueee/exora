import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './app.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  appName = "Exora Web";
  resultMessage: string;

  constructor(private service: AppService) {}

  async logIn(): Promise<void> {
    let message = await this.service.logIn();
    this.resultMessage = message.message;
  }

  async signUp(): Promise<void> {
    let message = await this.service.signUp();
    this.resultMessage = message.message;
  }

  reset(): void {
    this.resultMessage = null;
  }
}
