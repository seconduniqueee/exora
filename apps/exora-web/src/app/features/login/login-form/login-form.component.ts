import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingButtonDirective } from "@exora-web/shared/directives";
import { LoginForm } from "../login.model";

@Component({
  selector: "app-login-form",
  templateUrl: "login-form.component.html",
  styleUrl: "login-form.component.scss",
  standalone: true,
  imports: [ReactiveFormsModule, LoadingButtonDirective],
})
export class LoginFormComponent {
  @Input() loginForm: FormGroupTyped<LoginForm>;
  @Input() errorMessage: string;
  @Input() isLoading: boolean;

  @Output() submitLoginForm = new EventEmitter<void>();
}
