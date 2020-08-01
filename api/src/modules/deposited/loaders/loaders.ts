import { depositedTranslationsLoader } from './deposited-translations-loader'
import { depositedOecdsLoader } from './deposited-oecds-loader'

export const Loaders = {
  depositedTranslationsLoader: depositedTranslationsLoader(),
  depositedOecdsLoader: depositedOecdsLoader(),
}
