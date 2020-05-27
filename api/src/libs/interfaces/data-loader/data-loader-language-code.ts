import { DataLoaderBasicArgs } from './data-loader-basic-args'
import { LanguageCode } from '@prisma-client'

export interface DataLoaderLanguageCode extends DataLoaderBasicArgs {
  languageCode: LanguageCode
}
