import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { ServicesService } from "./services.service";
import { NamedEntityModel } from "@exora/shared-models";

@Component({
  templateUrl: "services.component.html",
  styleUrl: "services.component.scss",
  standalone: true,
  providers: [ServicesService],
})
export class ServicesComponent implements OnInit {
  serviceTypes: WritableSignal<NamedEntityModel[]> = signal(null);

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    void this.setServiceTypes();
  }

  private async setServiceTypes(): Promise<void> {
    let types = await this.service.getServiceTypes();
    this.serviceTypes.set(types);
  }
}
