import { ApplicationRef, createComponent, Injectable, Injector, Type } from "@angular/core";
import { DIALOG_DATA } from "../tokens/dialog-data.token";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  open<C, T>(component: Type<C>, data: T) {
    let elementInjector = Injector.create({
      providers: [{ provide: DIALOG_DATA, useValue: data }],
      parent: this.injector,
    });

    let environmentInjector = this.appRef.injector;
    let hostElement = document.getElementById("dialog-host");
    let componentRef = createComponent(component, {
      environmentInjector,
      elementInjector,
      hostElement,
    });

    this.appRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
    hostElement.classList.add("opened");
  }
}
