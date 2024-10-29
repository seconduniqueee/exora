import { Component } from "@angular/core";
import { LoadingSpinnerComponent } from "../../../shared";

@Component({
  selector: "app-boot-overlay",
  templateUrl: "boot-overlay.component.html",
  styleUrl: "boot-overlay.component.scss",
  imports: [LoadingSpinnerComponent],
  standalone: true,
})
export class BootOverlayComponent {
  message = "Website is loading...";
}
