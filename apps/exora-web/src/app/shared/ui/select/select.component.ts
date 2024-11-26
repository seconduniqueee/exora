import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  input,
  OnInit,
  QueryList,
  signal,
  viewChild,
} from "@angular/core";
import { FormControl, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { getSourceControl } from "../../../core/utils";
import { OptionComponent } from "@exora-web/shared/ui/select/option/option.component";
import { Subscription } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { EmittedDataOnClick } from "@exora-web/shared/ui/select/select.model";
import { ClickOutsideDirective } from "@exora-web/shared/directives/click-outside.directive";
import { NgClass } from "@angular/common";

@UntilDestroy()
@Component({
  selector: "app-select",
  templateUrl: "select.component.html",
  styleUrl: "select.component.scss",
  standalone: true,
  imports: [ReactiveFormsModule, ClickOutsideDirective, NgClass],
})
export class SelectComponent<T> implements OnInit, AfterViewInit {
  // TODO: Configure max height of the dropdown to avoid offscreen render
  // TODO: Configure proper dropdown positioning (top/bottom, (?) right/left)
  // TODO: Improve accessibility (option arrow keys, Esc, moving focus back to select wrapper)

  sourceControl: FormControl;

  projectionWrapper = viewChild<ElementRef>("projectionWrapper");
  projectedContent = signal<HTMLElement>(null);
  controlName = input<string>();
  control = input<AbstractControl>();
  placeholder = input<string>("Select value");
  dropdownOpened = signal(false);
  subscriptions = new Subscription();

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent<T>>;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.setSourceControl();
    this.setSourceControlUpdates();
  }

  ngAfterViewInit(): void {
    this.options.changes.subscribe((options) => this.subscribeToOptionsClick(options));
    this.subscribeToOptionsClick(this.options);
  }

  toggleDropdown(toOpen?: boolean): void {
    let value = toOpen ?? !this.dropdownOpened();
    this.dropdownOpened.set(value);
  }

  processKeyDown(event: KeyboardEvent): void {
    if (event.key !== "Enter" || this.dropdownOpened()) return;

    this.dropdownOpened.set(true);
  }

  private setSourceControl(): void {
    this.sourceControl = getSourceControl(
      this.controlName(),
      this.control(),
      this.formGroupDirective,
    ) as FormControl;
  }

  private setSourceControlUpdates(): void {
    this.sourceControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      let option = this.options.find((option) => option.value() === value);
      this.setContent(option?.contentRef());
    });
  }

  private subscribeToOptionsClick(options: QueryList<OptionComponent<T>>): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();

    options.forEach((option) => {
      let sub = option.optionSelected.subscribe((v) => this.processClickedOption(v));
      this.subscriptions.add(sub);
    });
  }

  private processClickedOption(event: EmittedDataOnClick<T>): void {
    this.sourceControl.setValue(event.value);
    this.setContent(event.projectedContent);
    this.dropdownOpened.set(false);
  }

  private setContent(ref: ElementRef): void {
    let content = ref?.nativeElement.cloneNode(true) || null;

    this.projectedContent()?.remove();
    this.projectedContent.set(content);
    content && this.projectionWrapper().nativeElement.appendChild(content);
  }
}
