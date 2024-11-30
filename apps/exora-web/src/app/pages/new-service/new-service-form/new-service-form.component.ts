import { Component, input, output } from "@angular/core";
import { NewServiceForm } from "../new-service.model";
import { NamedEntityModel } from "@exora/shared-models";
import { FORM_IMPORTS } from "@exora-web/shared/imports";

@Component({
  selector: "app-new-service-form",
  templateUrl: "new-service-form.component.html",
  styleUrl: "new-service-form.component.scss",
  standalone: true,
  imports: [...FORM_IMPORTS],
})
export class NewServiceFormComponent {
  newServiceForm = input<FormGroupTyped<NewServiceForm>>();
  serviceTypes = input<NamedEntityModel[] | null>([]);

  createNewService = output<void>();
  cancel = output<void>();
}
