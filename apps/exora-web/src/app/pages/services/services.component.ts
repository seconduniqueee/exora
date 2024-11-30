import { Component, OnInit } from "@angular/core";
import { ServicesService } from "./services.service";
import { RouterLink } from "@angular/router";
import { ServicesQuery, ServicesRepository } from "./services.repository";
import { AsyncPipe } from "@angular/common";
import { LoadingSpinnerComponent } from "@exora-web/shared/ui";

@Component({
  templateUrl: "services.component.html",
  styleUrl: "services.component.scss",
  standalone: true,
  providers: [ServicesService, ServicesRepository, ServicesQuery],
  imports: [RouterLink, AsyncPipe, LoadingSpinnerComponent],
})
export class ServicesComponent implements OnInit {
  constructor(
    public query: ServicesQuery,
    private service: ServicesService,
  ) {}

  ngOnInit(): void {
    void this.service.loadServices();
  }
}
