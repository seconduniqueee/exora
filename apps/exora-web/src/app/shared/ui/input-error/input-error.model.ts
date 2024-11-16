export interface InputErrors {
  [key: string]: string;
}

export const COMMON_ERROR_MESSAGES: InputErrors = {
  required: "This field is required",
  email: "Incorrect email format",
};
