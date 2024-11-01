import { Component } from "@angular/core";
import { APP_NAVIGATION_ITEMS } from "../../layout.model";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-header-navigation",
  templateUrl: "header-navigation.component.html",
  styleUrl: "header-navigation.component.scss",
  standalone: true,
  imports: [RouterModule],
})
export class HeaderNavigationComponent {
  navigationItems = APP_NAVIGATION_ITEMS;
}
