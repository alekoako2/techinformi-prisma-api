import * as jwt from 'jsonwebtoken'

export interface Context {
    req: any
    prisma
}

export function getUserId(ctx: Context) {
    const Authorization = ctx.req.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const {userId} = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
        return userId
    }

    throw new AuthError()
}

export function getUser(ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.user({id});
}

export class AuthError extends Error {
    constructor() {
        super('Not authorized')
    }
}
