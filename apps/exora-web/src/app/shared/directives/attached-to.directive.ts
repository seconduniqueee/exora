import { Directive, ElementRef, HostListener, inject, input, OnInit } from "@angular/core";

@Directive({
  selector: "[attachedTo]",
  standalone: true,
})
export class AttachedToDirective implements OnInit {
  attachedTo = input<HTMLElement>();
  minHeight = input<number>();
  matchParentWidth = input<boolean>(true);
  elementRef = inject(ElementRef);

  @HostListener("window:resize", ["$event"])
  handleResizeEvent(): void {
    this.setAttachmentPosition();
  }

  @HostListener("window:scroll", ["$event"])
  handleScrollEvent(): void {
    this.setAttachmentPosition();
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.opacity = "0";

    setTimeout(() => {
      this.setAttachmentPosition();
      this.elementRef.nativeElement.style.opacity = "1";
    });
  }

  private setAttachmentPosition(): void {
    let elem = this.elementRef.nativeElement;
    let width = this.attachedTo().getBoundingClientRect().width;
    let position = this.calculateAttachmentPosition();

    elem.style.position = "fixed";
    elem.style.left = position.left;
    elem.style.top = position.top ? position.top + "px" : "";
    elem.style.bottom = position.bottom ? position.bottom + "px" : "";
    elem.style.maxWidth = this.matchParentWidth() ? width + "px" : "";
  }

  private calculateAttachmentPosition(): Position {
    let attachedTo = this.attachedTo();
    let { x, y, height } = attachedTo.getBoundingClientRect();
    let attachmentHeight = this.elementRef.nativeElement.getBoundingClientRect().height;
    let viewportHeight = window.innerHeight;
    let canFitBelow = viewportHeight - y > attachmentHeight;

    return {
      top: canFitBelow ? y + height : null,
      left: x,
      bottom: canFitBelow ? null : viewportHeight - y,
    };
  }
}

export interface Position {
  top: number;
  left: number;
  bottom: number;
}
