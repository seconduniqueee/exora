import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrl: "./loading-spinner.component.scss",
  imports: [CommonModule],
  standalone: true,
})
export class LoadingSpinnerComponent {
  @Input() width = 20;
  @Input() strokeWidth = 3;
}
