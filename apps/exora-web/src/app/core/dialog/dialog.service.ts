import { ApplicationRef, createComponent, Injectable, Injector, Type } from "@angular/core";
import { DIALOG_DATA } from "../tokens/dialog-data.token";
import { finalize, Subject, take } from "rxjs";
import { DialogConfig, DialogRef, OverlayRef } from "./dialog.model";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  open<R, C, T>(component: Type<C>, config: DialogConfig<T>): Observable<R> {
    let appRef = this.appRef;
    let closeEventEmitter = new Subject<R>();
    let dialogRef: DialogRef<R> = { closeDialog: (data?: R) => closeEventEmitter.next(data) };
    let elementInjector = this.getDialogComponentInjector(dialogRef, config.data);
    let overlayRef = this.getElementWrapper(config);
    let environmentInjector = this.appRef.injector;
    let hostElement = document.getElementById("dialog-host");
    let componentRef = createComponent(component, {
      environmentInjector,
      elementInjector,
      hostElement: overlayRef.dialogContainer,
    });
    let dialogResultHolder = closeEventEmitter.asObservable().pipe(
      take(1),
      finalize(() => closeEventEmitter.complete()),
    );

    closeEventEmitter.pipe(take(1)).subscribe(() => {
      componentRef.destroy();
      overlayRef.overlay.remove();
    });

    appRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
    hostElement.appendChild(overlayRef.overlay);
    overlayRef.onOverlayOpen();

    return dialogResultHolder;
  }

  private getElementWrapper<T>(config: DialogConfig<T>): OverlayRef {
    let overlay = document.createElement("div");
    let dialogContainer = document.createElement("div");
    let onOverlayOpen = () => setTimeout(() => overlay.classList.add("opened"));

    overlay.classList.add("app-dialog-overlay");
    dialogContainer.classList.add("app-dialog-wrapper");
    dialogContainer.style.width = config.width || "";
    overlay.appendChild(dialogContainer);

    return { overlay, dialogContainer, onOverlayOpen };
  }

  private getDialogComponentInjector<T, R>(dialogRef: DialogRef<T>, dialogData: R): Injector {
    let elementInjector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: dialogData },
        { provide: DialogRef, useValue: dialogRef },
      ],
      parent: this.injector,
    });

    return elementInjector;
  }
}
