import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { DialogService } from "../../core/dialog/dialog.service";
import { DatePickerComponent } from "@exora-web/shared/ui/date-picker/date-picker.component";
import { DatePipe } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormSubmitDirective } from "@exora-web/shared/directives";

@Component({
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
  providers: [DialogService, AuthService, DatePickerComponent],
  standalone: true,
  imports: [DatePickerComponent, DatePipe, FormSubmitDirective, ReactiveFormsModule],
})
export class HomeComponent implements OnInit {
  dateForm: FormGroupTyped<DateForm>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    return this.authService.userInfo.firstName;
  }

  ngOnInit(): void {
    this.initDateForm();
  }

  submitForm(): void {
    console.log(this.dateForm.value);
  }

  private initDateForm(): void {
    this.dateForm = this.fb.group({
      testDate: [null, Validators.required],
    }) as FormGroupTyped<DateForm>;
  }
}

interface DateForm {
  testDate: Date;
}
