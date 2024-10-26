import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserID = createParamDecorator((data: string, context: ExecutionContext) => {
  let request = context.switchToHttp().getRequest();
  return request.user.sub;
});
