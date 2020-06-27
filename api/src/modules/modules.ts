import { QrjJournalsModule } from './qrj-journals'
import { LanguageModule } from './language'
import { OecdModule } from './oecd'
import { UserModule } from './user'
import { QrjPublicationModule } from './qrj-publications'
import { TechnologyTransferAndInnovationOrganizationModule } from './TechnologyTransferCenters/TechnologyTransferAndInnovationOrganizationModule'
import { TechnologyTransferNetworkModule } from './TechnologyTransferCenters/TechnologyTransferNetworkModule'
import { EmployeeModule } from './EmployeeModule'
import { ExpertModule } from './experts'
import { NewsModule } from './newses'
import { QrjModule } from './QrjModule'

export const modules = [
  QrjJournalsModule,
  QrjPublicationModule,
  LanguageModule,
  UserModule,
  OecdModule,
  TechnologyTransferAndInnovationOrganizationModule,
  TechnologyTransferNetworkModule,
  EmployeeModule,
  ExpertModule,
  NewsModule,
  QrjModule,
]
