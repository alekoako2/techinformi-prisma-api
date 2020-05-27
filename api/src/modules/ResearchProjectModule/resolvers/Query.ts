import {
  ResearchProjectOrderByInput,
  ResearchProjectWhereInput,
} from '@prisma-client'
import { Context } from '@interfaces/apollo/context'

interface opArgs {
  first: String
  skip: String
  where?: ResearchProjectWhereInput
  orderBy?: ResearchProjectOrderByInput
}

function setOpArgs(args) {
  const opArgs: opArgs = {
    first: args.first,
    skip: args.skip,
  }

  if (args.query) {
    const {
      title,
      leaderExecutors,
      keywords,
      organizationName,
      oecd,
      yearResearchProgressStartOrEndYear,
      fromYear,
      toYear,
    } = args.query
    opArgs.where = { AND: [] }
    opArgs.where.AND = []
    if (title) {
      opArgs.where.AND.push({ translation_some: { title_contains: title } })
    }
    if (leaderExecutors) {
      opArgs.where.AND.push({
        OR: [
          { researchExecutors_contains: leaderExecutors },
          { leaderName_contains: leaderExecutors },
        ],
      })
    }
    if (keywords) {
      opArgs.where.AND.push({
        translation_some: { key_some: { name_contains: keywords } },
      })
    }
    if (organizationName) {
      opArgs.where.AND.push({ organizationName_contains: organizationName })
    }
    if (oecd) {
      opArgs.where.AND.push({ oecds_some: { code: oecd } })
    }
    if (yearResearchProgressStartOrEndYear) {
      let range_to =
        new Date(yearResearchProgressStartOrEndYear).getFullYear() + 1
      opArgs.where.AND.push({
        OR: [
          {
            AND: [
              { regDate_gt: yearResearchProgressStartOrEndYear },
              { regDate_lt: range_to.toString() },
            ],
          },
          {
            AND: [
              { startDate_gt: yearResearchProgressStartOrEndYear },
              { startDate_lt: range_to.toString() },
            ],
          },
          {
            AND: [
              { endDate_gt: yearResearchProgressStartOrEndYear },
              { endDate_lt: range_to.toString() },
            ],
          },
        ],
      })
    }
    if (fromYear) {
      opArgs.where.AND.push({ startDate_gt: fromYear })
    }
    if (toYear) {
      opArgs.where.AND.push({ startDate_lt: toYear })
    }
  }

  opArgs.orderBy = 'createdAt_DESC'

  return opArgs
}

export const Query = {
  researchProjects(parent, args, ctx: Context) {
    const opArgs = setOpArgs(args)
    return ctx.prisma.researchProjects()
  },

  countResearchProjects(parent, args, ctx: Context) {
    const opArgs = setOpArgs(args)
    return ctx.prisma
      .researchProjectsConnection()
      .aggregate()
      .count()
  },

  researchProject(parent, { id }, ctx: Context) {
    return ctx.prisma.researchProject({ id })
  },
}
