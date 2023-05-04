export type Condition = {
  condition: String;
  negotiable: Boolean;
};

export enum TemplateType {
  Generic,
  Design,
  Development,
  Others,
}

export enum DeliverableFormat {
  PDF,
  ZIP,
  JPEG,
  MP4,
}

export enum ContractCreationStages {
  ClientInformation,
  ScopeOfWork,
  PaymentAndMilestones,
  DraftReview,
  SignContract,
}

export enum ContractViewStages {
  Overview,
  EditContract,
}

export enum ContractSidePanelStages {
  MilestonesPanel,
  ChatsPanel,

  PaymentPanel,
  DeliverablesPanel,
}

export type Deliverable = {
  name: string;
  description: string;
  expectedDate: Date;
  isMilestone?: Boolean;
  format: DeliverableFormat;
  attachment: FileList;
  milestone?: string;
};

export enum DeliverableStatus {
  NotSubmitted,
  SubmittedForApproval,
  SubmittedExternally,
  InFeedback,
  Approved,
  Rejected,
}

export enum MilestoneStatus {
  Current,
  CurrentContractSpecific,
  Completed,
  Failed,
  Upcoming,
}


export enum MessageStatus {
  Sent,
  Completed,
  Failed,
  Upcoming,
  Opened,
}

export type Milestone = {
  isLastMilestone?: boolean;
  expectedDate?: Date;
  name: string;
  description: string;
  deliverables?: Array<Deliverable>;
  status?: MilestoneStatus;
};

export enum DeliverableType {
  Advance,
  Delivery,
}

export enum ContractStatus {
  Draft,
  Published,
}

export type Revision = {
  id: string;
  description: string;
};

export enum ContractCreator {
  IndividualClient,
  EnterpriseClient,
  IndividualServiceProvider,
}

export interface Contract {
  isPublished?: string;
  clientPAN?: string;
  role?:string;
  clientAadhaar?: string;

  providerAddress?: string;
  providerPAN?: string;
  providerAadhaar?: string;

  signedByClientDate?: number;
  clientID?: string;
  providerID?: string;
  signedByProviderDate?: number;
  signedByProvider?: boolean;
  signedByClient?: boolean;
  viewers: string[];
  contractValue?: string;
  milestonesProcessed?: {
    advance: Milestone;
    workMilestones: { [key: string]: Milestone };
  };
  clientAddress?: string;
  hasDeliverables?: boolean;
  payoutTriggered?: boolean;
  providerEmail: string;
  isClient?: boolean;
  hasMilestones?: boolean;
  status?: ContractStatus;
  creator?: ContractCreator;
  revisions?: number;
  id?: string;
  isSigned?: boolean;
  projectName?: string;
  basePayCondition?: Condition;
  basePayAmount?: number;
  clientName?: string;
  isCompany?: Boolean;
  milestonesCount: number;
  milestones?: {
    advance: Milestone;
    workMilestones: { [key: string]: Milestone };
  };
  providerName?: string;
  country?: string;
  companyName?: string;
  companyRole?: string;
  signedDate?: Date;
  hasAdvance?: boolean;
  advancePercentage?: string;
  description?: string;
  externalDeliverables?: boolean;
  supportPolicy?: string;
  startDate?: Date;
  redressalWindow?: number;
  endDate?: Date;
  endCondition?: Condition;
  paymentType?: string;
  workOwnership?: string;
  ownershipType?: boolean;
  totalValue?: string;
  invoiceDate?: Date;
  invoiceCondition?: Condition;
  contractNotice?: number;
  stage: number;
  viewStage: number;
  sidePanelStage: number;
  attachment?: FileList;
  template: string;
  clientEmail?: string;
  deliverablesCount: number;
  deliverables?: Array<Deliverable>;
}


export const DEFAULT_CONTRACT_STATE = {
  stage: ContractCreationStages.ClientInformation,
  creator: ContractCreator.IndividualClient,
  viewStage: ContractViewStages.Overview,
  sidePanelStage: ContractSidePanelStages.MilestonesPanel,
  status: ContractStatus.Draft,
  externalDeliverables: false,
  deliverablesCount: 1,
  hasAdvance: false,
  hasDeliverables: false,
  hasMilestones: false,
  milestonesCount: 0,
  deliverables: [],
  milestones: [],
  payoutTriggered: false,
  template: 'design'
};

// export interface Template  {
//   type: TemplateType;
//   data: Contract;
//   renderSimplified: () => string;
//   renderComplex: () => string;
//   () : Component;
// };
