import { Component, OnInit, signal } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginFormComponent } from "./login-form/login-form.component";
import { HOME_PAGE_PATH } from "../../core/auth/auth.model";
import { toSignal } from "@angular/core/rxjs-interop";
import { LoginForm } from "./login.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  templateUrl: "login.component.html",
  styleUrl: "login.component.scss",
  imports: [RouterModule, ReactiveFormsModule, LoginFormComponent],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroupTyped<LoginForm>;
  errorMessage = signal("");
  isLoading: Signal<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.isLoading = toSignal(authService.isLoading$);
  }

  ngOnInit() {
    this.initLoginForm();
  }

  async signIn(): Promise<void> {
    let formValue = this.loginForm.value;
    let result = await this.authService.signIn(formValue.email, formValue.password);

    if (result?.isSuccess) {
      await this.router.navigate([HOME_PAGE_PATH]);
    } else {
      this.errorMessage.set(result.errorMessage);
    }
  }

  private initLoginForm(): void {
    let { required, email } = Validators;

    this.loginForm = this.fb.group({
      email: [null, [required, email]],
      password: [null, required],
    }) as FormGroupTyped<LoginForm>;

    this.loginForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.errorMessage.set(""));
  }
}
