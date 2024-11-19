import { ApplicationRef, createComponent, Injectable, Injector, Type } from "@angular/core";
import { DIALOG_DATA } from "../tokens/dialog-data.token";
import { finalize, firstValueFrom, Subject, take } from "rxjs";
import { DialogConfig, DialogRef, OverlayRef } from "./dialog.model";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  open<R, C, T>(component: Type<C>, config: DialogConfig<T>): Promise<R> {
    let trigger = new Subject<R>();
    let dialogRef: DialogRef<R> = { closeDialog: (data?: R) => trigger.next(data) };

    let elementInjector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: config.data },
        { provide: DialogRef, useValue: dialogRef },
      ],
      parent: this.injector,
    });

    let overlayRef = this.getElementWrapper(config);
    let environmentInjector = this.appRef.injector;
    let hostElement = document.getElementById("dialog-host");
    let componentRef = createComponent(component, {
      environmentInjector,
      elementInjector,
      hostElement: overlayRef.dialogContainer,
    });

    trigger.subscribe(() => {
      componentRef.destroy();
      overlayRef.overlay.remove();
    });

    this.appRef.attachView(componentRef.hostView);

    componentRef.changeDetectorRef.detectChanges();
    hostElement.appendChild(overlayRef.overlay);
    overlayRef.onOverlayOpen();

    return firstValueFrom(
      trigger.asObservable().pipe(
        take(1),
        finalize(() => trigger.complete()),
      ),
    );
  }

  private getElementWrapper<T>(config: DialogConfig<T>): OverlayRef {
    let overlay = document.createElement("div");
    let dialogContainer = document.createElement("div");
    let onOverlayOpen = () => setTimeout(() => overlay.classList.add("opened"));

    overlay.classList.add("app-dialog-overlay");
    dialogContainer.classList.add("app-dialog-wrapper");
    dialogContainer.style.maxWidth = config.width || "";
    overlay.appendChild(dialogContainer);

    return { overlay, dialogContainer, onOverlayOpen };
  }
}
