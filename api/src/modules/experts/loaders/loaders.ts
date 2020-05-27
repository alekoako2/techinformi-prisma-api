import { expertTranslationsLoader } from './expert-translations-loader'
import { expertLanguagesLoader } from './expert-languages-loader'
import { expertOecdsLoader } from './expert-oecds-loader'

export const Loaders = {
  expertTranslationsLoader: expertTranslationsLoader(),
  expertLanguagesLoader: expertLanguagesLoader(),
  expertOecdsLoader: expertOecdsLoader(),
}
