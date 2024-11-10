import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((context: ExecutionContext, data: string) => {
  let request = context.switchToHttp().getRequest();
  return data ? request.user[data] : request.user;
});
