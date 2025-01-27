import { Component, OnInit } from "@angular/core";
import { NewServiceService } from "./new-service.service";
import { NewServiceQuery, NewServiceRepository } from "./new-service.repository";
import { NewServiceFormComponent } from "./new-service-form/new-service-form.component";
import { NewServiceForm } from "./new-service.model";
import { FormBuilder, Validators } from "@angular/forms";
import { AsyncPipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-service",
  templateUrl: "new-service.component.html",
  styleUrl: "new-service.component.scss",
  standalone: true,
  imports: [NewServiceFormComponent, AsyncPipe],
  providers: [NewServiceService, NewServiceRepository, NewServiceQuery],
})
export class NewServiceComponent implements OnInit {
  newServiceForm: FormGroupTyped<NewServiceForm>;

  constructor(
    public query: NewServiceQuery,
    private service: NewServiceService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  async ngOnInit(): Promise<void> {
    this.initNewServiceForm();
    await this.service.loadRelatedData();
  }

  async createNewService(): Promise<void> {
    let formValue = this.newServiceForm.getRawValue();
    let result = await this.service.createService(formValue);

    result && (await this.router.navigate(["services"]));
  }

  async backToServices(): Promise<void> {
    await this.router.navigate(["services"]);
  }

  private initNewServiceForm(): void {
    let { required } = Validators;

    this.newServiceForm = this.fb.group({
      name: [null, required],
      description: [null, required],
      serviceTypeID: [null, required],
      price: [null, required],
    }) as FormGroupTyped<NewServiceForm>;
  }
}
