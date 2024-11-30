import { ReactiveFormsModule } from "@angular/forms";
import { InputErrorComponent } from "@exora-web/shared/ui";
import { SelectComponent } from "@exora-web/shared/ui/select/select.component";
import { DatePickerComponent } from "@exora-web/shared/ui/date-picker/date-picker.component";
import { FormSubmitDirective } from "@exora-web/shared/directives";
import { OptionComponent } from "@exora-web/shared/ui/select/option/option.component";

export const FORM_IMPORTS = [
  ReactiveFormsModule,
  InputErrorComponent,
  SelectComponent,
  DatePickerComponent,
  FormSubmitDirective,
  OptionComponent,
  ReactiveFormsModule,
];
