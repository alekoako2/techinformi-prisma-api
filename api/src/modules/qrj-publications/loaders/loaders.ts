import { qrjPublicationTranslationsLoader } from './qrj-publication-translations-loader'
import { qrjPublicationQrjJournalsLoader } from './qrj-publication-qrj-journals-loader'
import { qrjPublicationOecdsLoader } from './qrj-publication-oecds-loader'

export const Loaders = {
  qrjPublicationTranslationsLoader: qrjPublicationTranslationsLoader(),
  qrjPublicationQrjJournalsLoader: qrjPublicationQrjJournalsLoader(),
  qrjPublicationOecdsLoader: qrjPublicationOecdsLoader(),
}
