import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserModel } from "@exora/shared-models";
import { RouterModule } from "@angular/router";
import { HeaderNavigationComponent } from "./header-navigation/header-navigation.component";
import { HeaderAuthComponent } from "./header-auth/header-auth.component";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrl: "header.component.scss",
  standalone: true,
  imports: [RouterModule, HeaderNavigationComponent, HeaderAuthComponent],
})
export class HeaderComponent {
  @Input() user: UserModel | null;
  @Input() isDarkTheme: boolean;

  @Output() logOut = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<boolean>();
}
