import { LanguageModule } from "../LanguageModule";
import { NewsModule } from "../NewsModule";
import { UserModule } from "../UserModule";
import { OecdModule } from "../OecdModule";
import { QrjJournalModule } from "../QrjJournalModule";
import { QrjPublicationModule } from "../QrjPublicationModule";
import { QrjModule } from "../QrjModule";
import { TechnologyTransferNetworkModule } from "../TechnologyTransferCenters/TechnologyTransferNetworkModule";
import { TechnologyTransferAndInnovationOrganizationModule } from "../TechnologyTransferCenters/TechnologyTransferAndInnovationOrganizationModule";
import { ExpertModule } from "../ExpertModule";
import { ResearchProjectModule } from "../ResearchProjectModule";
import { EmployeeModule } from "../EmployeeModule";

export const AppModule = [
  UserModule,
  EmployeeModule,
  LanguageModule,
  NewsModule,
  OecdModule,
  QrjJournalModule,
  QrjPublicationModule,
  QrjModule,
  TechnologyTransferNetworkModule,
  TechnologyTransferAndInnovationOrganizationModule,
  ExpertModule,
  ResearchProjectModule
];
