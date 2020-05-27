import { Prisma } from '@prisma-client'

export interface Context {
  req: any
  prisma: Prisma
}
