import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerComponent } from "@exora-web/shared/ui";
import { LoadingButtonDirective } from "@exora-web/shared/directives";

@Component({
  selector: "app-login-form",
  templateUrl: "login-form.component.html",
  styleUrl: "login-form.component.scss",
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent, LoadingButtonDirective],
})
export class LoginFormComponent {
  @Input() loginForm: FormGroup;
  @Input() showErrorMessage: boolean;
  @Input() isLoading: boolean;

  @Output() submitLoginForm = new EventEmitter<void>();
}
