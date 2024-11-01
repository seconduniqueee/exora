import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserModel } from "@exora/shared-models";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-header-auth",
  templateUrl: "header-auth.component.html",
  styleUrl: "header-auth.component.scss",
  standalone: true,
  imports: [RouterModule],
})
export class HeaderAuthComponent {
  @Input() user: UserModel;
  @Input() isDarkTheme: boolean;

  @Output() logOut = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
}
