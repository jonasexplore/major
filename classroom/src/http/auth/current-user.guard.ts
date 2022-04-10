import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthUser } from '../../types/auth-user';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUser => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return req.user;
  },
);
