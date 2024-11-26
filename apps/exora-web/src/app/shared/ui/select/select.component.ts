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

@UntilDestroy()
@Component({
  selector: "app-select",
  templateUrl: "select.component.html",
  styleUrl: "select.component.scss",
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SelectComponent<T> implements OnInit, AfterViewInit {
  sourceControl: FormControl;

  projectionWrapper = viewChild<ElementRef>("projectionWrapper");
  projectedContent = signal<HTMLElement>(null);
  controlName = input<string>();
  control = input<AbstractControl>();
  subscription = new Subscription();

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
    this.subscription.unsubscribe();
    this.subscription = new Subscription();

    options.forEach((option) => {
      let sub = option.optionSelected.subscribe((v) => this.processClickedOption(v));
      this.subscription.add(sub);
    });
  }

  private processClickedOption(event: EmittedDataOnClick<T>): void {
    this.sourceControl.setValue(event.value);
    this.setContent(event.projectedContent);
  }

  private setContent(ref: ElementRef): void {
    let content = ref?.nativeElement.cloneNode(true) || null;

    this.projectedContent()?.remove();
    this.projectedContent.set(content);
    this.projectionWrapper().nativeElement.innerHTML = content;
  }
}
