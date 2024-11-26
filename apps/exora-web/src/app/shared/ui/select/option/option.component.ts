import { Component, input, output, viewChild } from "@angular/core";
import { EmittedDataOnClick } from "@exora-web/shared/ui/select/select.model";

@Component({
  selector: "app-option",
  templateUrl: "option.component.html",
  styleUrl: "option.component.scss",
  standalone: true,
})
export class OptionComponent<T> {
  value = input<T>();
  contentRef = viewChild<ElementRef>("projection");
  optionSelected = output<EmittedDataOnClick<T>>();

  selectOption(): void {
    this.optionSelected.emit({
      projectedContent: this.contentRef(),
      value: this.value(),
    });
  }

  processKeyDown(event: KeyboardEvent): void {
    if (event.key !== "Enter") return;

    event.stopPropagation();

    this.optionSelected.emit({
      projectedContent: this.contentRef(),
      value: this.value(),
    });
  }
}
