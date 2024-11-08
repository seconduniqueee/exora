import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingButtonDirective } from "@exora-web/shared/directives";
import { SignUpForm } from "../sign-up.model";

@Component({
  selector: "app-sign-up-form",
  templateUrl: "sign-up-form.component.html",
  styleUrl: "sign-up-form.component.scss",
  standalone: true,
  imports: [ReactiveFormsModule, LoadingButtonDirective],
})
export class SignUpFormComponent {
  @Input() signUpForm: FormGroupTyped<SignUpForm>;
  @Input() errorMessage: string;
  @Input() isLoading: boolean;

  @Output() submitSignUpForm = new EventEmitter<void>();
}
