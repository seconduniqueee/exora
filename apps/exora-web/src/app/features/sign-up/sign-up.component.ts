import { Component, OnInit, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { SignUpForm } from "./sign-up.model";
import { AuthService } from "../../core/auth/auth.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { HOME_PAGE_PATH } from "../../core/auth/auth.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  templateUrl: "sign-up.component.html",
  styleUrl: "sign-up.component.scss",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, SignUpFormComponent],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroupTyped<SignUpForm>;
  errorMessage = signal("");
  isLoading: Signal<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.isLoading = toSignal(authService.isLoading$);
  }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  async signUp(): Promise<void> {
    let formValue = this.signUpForm.getRawValue();
    let result = await this.authService.signUp(formValue);

    if (result.isSuccess) {
      await this.router.navigate([HOME_PAGE_PATH]);
    } else {
      this.errorMessage.set(result.errorMessage);
    }
  }

  private initSignUpForm(): void {
    this.signUpForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: null,
    }) as FormGroupTyped<SignUpForm>;

    this.signUpForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.errorMessage.set(""));
  }
}
