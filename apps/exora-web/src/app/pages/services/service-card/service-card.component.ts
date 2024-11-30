import { Component, input } from "@angular/core";
import { ServiceModel } from "@exora/shared-models";

@Component({
  selector: "app-service-card",
  templateUrl: "service-card.component.html",
  styleUrl: "service-card.component.scss",
  standalone: true,
})
export class ServiceCardComponent {
  service = input<ServiceModel>();
}
