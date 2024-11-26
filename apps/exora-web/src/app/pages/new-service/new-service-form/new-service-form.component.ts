import { Component, input, output } from "@angular/core";
import { NewServiceForm } from "../new-service.model";
import { ReactiveFormsModule } from "@angular/forms";
import { FormSubmitDirective } from "@exora-web/shared/directives";
import { InputErrorComponent } from "@exora-web/shared/ui";
import { NamedEntityModel } from "@exora/shared-models";
import { SelectComponent } from "@exora-web/shared/ui/select/select.component";
import { OptionComponent } from "@exora-web/shared/ui/select/option/option.component";
import { DatePickerComponent } from "@exora-web/shared/ui/date-picker/date-picker.component";

@Component({
  selector: "app-new-service-form",
  templateUrl: "new-service-form.component.html",
  styleUrl: "new-service-form.component.scss",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormSubmitDirective,
    InputErrorComponent,
    SelectComponent,
    OptionComponent,
    DatePickerComponent,
  ],
})
export class NewServiceFormComponent {
  newServiceForm = input<FormGroupTyped<NewServiceForm>>();
  serviceTypes = input<NamedEntityModel[] | null>([]);

  createNewService = output<void>();
  cancel = output<void>();

  removeService(): void {
    this.newServiceForm().patchValue({ serviceTypeID: null });
  }
}
