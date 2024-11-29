import { Directive, ElementRef, HostBinding, input } from "@angular/core";

@Directive({
  selector: "[loadingButton]",
  standalone: true,
})
export class LoadingButtonDirective {
  loadingButton = input<boolean>(false);

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add("loading-button");
  }

  @HostBinding("class.is-loading")
  get isLoading(): boolean {
    return this.loadingButton();
  }
}
