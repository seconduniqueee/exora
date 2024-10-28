import { Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-layout",
  templateUrl: "layout.component.html",
  styleUrl: "layout.component.scss",
  imports: [HeaderComponent],
  standalone: true,
})
export class LayoutComponent {}
