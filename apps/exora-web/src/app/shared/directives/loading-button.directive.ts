import { Directive, ElementRef, HostBinding, Input } from "@angular/core";

@Directive({
  selector: "[loadingButton]",
  standalone: true,
})
export class LoadingButtonDirective {
  @Input() loadingButton = false;

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add("loading-button");
  }

  @HostBinding("class.is-loading")
  get isLoading(): boolean {
    return this.loadingButton;
  }
}
