import { Directive, ElementRef, HostListener, output } from "@angular/core";

@Directive({
  selector: "[clickOutside]",
  standalone: true,
})
export class ClickOutsideDirective {
  clickOutside = output<void>();

  constructor(private el: ElementRef) {}

  @HostListener("document:mousedown", ["$event"])
  handleDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  }
}
