import { Component } from "@angular/core";
import { ServicesService } from "./services.service";
import { RouterLink } from "@angular/router";

@Component({
  templateUrl: "services.component.html",
  styleUrl: "services.component.scss",
  standalone: true,
  providers: [ServicesService],
  imports: [RouterLink],
})
export class ServicesComponent {}
