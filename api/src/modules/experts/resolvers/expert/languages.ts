import { Context } from '@interfaces/apollo/context'
import { Loaders } from '../../loaders'
import { Expert } from '@prisma-client'

export const languages = ({ id }: Expert, __, { prisma }: Context) =>
  Loaders.expertLanguagesLoader.load({
    id,
    prisma,
  })
