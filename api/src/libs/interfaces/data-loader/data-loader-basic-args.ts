import { ID_Input, Prisma } from '@prisma-client'

export interface DataLoaderBasicArgs {
  prisma: Prisma
  id: ID_Input
}
