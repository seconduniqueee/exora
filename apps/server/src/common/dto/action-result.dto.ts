import { ActionResultModel } from "@exora/shared-models";

export class ActionResultDto implements ActionResultModel {
  errorMessage?: string;
  isSuccess: boolean;
}
