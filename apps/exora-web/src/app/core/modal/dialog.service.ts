import { ApplicationRef, createComponent, Injectable, Injector, Type } from "@angular/core";
import { DIALOG_DATA } from "../tokens/dialog-data.token";
import { finalize, firstValueFrom, Subject, take } from "rxjs";
import { DialogRef } from "./dialog.model";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  open<R, C, T>(component: Type<C>, data: T): Promise<R> {
    let trigger = new Subject<R>();
    let dialogRef: DialogRef<R> = { closeDialog: (data?: R) => trigger.next(data) };

    let elementInjector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: data },
        { provide: DialogRef, useValue: dialogRef },
      ],
      parent: this.injector,
    });

    let host = this.getElementWrapper();
    let environmentInjector = this.appRef.injector;
    let hostElement = document.getElementById("dialog-host");
    let componentRef = createComponent(component, {
      environmentInjector,
      elementInjector,
      hostElement: host,
    });

    trigger.subscribe(() => {
      componentRef.destroy();
      host.remove();
    });

    this.appRef.attachView(componentRef.hostView);

    componentRef.changeDetectorRef.detectChanges();
    hostElement.appendChild(host);
    hostElement.classList.add("opened");

    return firstValueFrom(
      trigger.asObservable().pipe(
        take(1),
        finalize(() => trigger.complete()),
      ),
    );
  }

  private getElementWrapper(): HTMLElement {
    let overlay = document.createElement("div");
    let backdrop = document.createElement("div");
    let dialogContainer = document.createElement("div");

    overlay.classList.add("app-dialog-overlay");
    backdrop.classList.add("app-dialog-backdrop");
    dialogContainer.classList.add("app-dialog-container");

    backdrop.appendChild(dialogContainer);
    overlay.appendChild(backdrop);

    return overlay;
  }
}
