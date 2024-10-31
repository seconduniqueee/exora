import { ChangeDetectorRef, Component, OnInit, signal } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginFormComponent } from "./login-form/login-form.component";
import { HOME_PAGE_PATH } from "../../core/auth/auth.model";
import { AsyncPipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrl: "login.component.scss",
  imports: [RouterModule, ReactiveFormsModule, LoginFormComponent, AsyncPipe],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorMessage = signal(false);
  isLoading: Signal<boolean>;

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isLoading = toSignal(authService.isLoading$);
  }

  ngOnInit() {
    this.initLoginForm();
  }

  async signIn(): Promise<void> {
    let formValue = this.loginForm.value;
    let result = await this.authService.signIn(formValue.email, formValue.password);

    result && (await this.router.navigate([HOME_PAGE_PATH]));
    this.showErrorMessage.set(!result);
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
