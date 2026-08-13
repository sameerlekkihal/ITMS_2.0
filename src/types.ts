export type UserType = 'ITMS' | 'POS' | 'LMS';
export type UserRole = 'Admin' | 'Manager' | 'Agent' | 'Ops';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  type: UserType;
  added: string;
  active: boolean;
}

export interface AppRole {
  id: number;
  name: string;
  product: string;
  ticket: string;
  addedBy: string;
  added: string;
  active: boolean;
  autoLogout: boolean;
}

export interface ToastState {
  msg: string;
  type: 'success' | 'error';
}

export interface WfProductData {
  sub: string[] | null;
  statuses: string[];
  transitions: Record<string, string[]>;
}

export type WfVerticalData = Record<string, WfProductData>;
export type WfData = Record<string, WfVerticalData>;

export interface IpApprover {
  label: string;
  value: string;
}

export interface IpUserRequest {
  id: string;
  insurer: string;
  opBy: string;
  gcd: string;
  date: string;
  status: string;
}

export interface IpLogin {
  id: number;
  loginId: string;
  insurer: string;
  status: string;
  imd: string;
  gcd: string;
}

export type PageKey = 'home' | 'users' | 'roles' | 'createuser' | 'workflow' | 'insurer' | 'servicerequests' | 'createhealthrequest' | 'allocationbuckets' | 'allocationrules' | 'qcdashboard';

export type CuStatus = 'Pending with L2' | 'User Created' | 'Rejected';

export interface CuLog {
  type: string;
  action: string;
  by: string;
  time: string;
}

export interface CuConfig {
  name: string;
  userType: UserType;
  role: string;
  region: string;
  teamOnly: boolean;
  autoLogout: boolean;
}

export interface CuRequest {
  id: string;
  empCode: string;
  email: string;
  mobile: string;
  roleMode: 'role' | 'equivalent';
  role: string;
  equivalentEmail: string;
  remark: string;
  raisedBy: string;
  raisedAt: string;
  status: CuStatus;
  config: CuConfig | null;
  rejectReason: string;
  logs: CuLog[];
}

// ---- Service Requests / Health case module ----

export type SrAgeingLevel = 'fresh' | 'aging' | 'urgent';

export interface SrActivityLogEntry {
  type: 'edit' | 'create' | 'perm' | 'login' | 'toggle' | 'delete' | 'assign';
  text: string;
  by: string;
  time: string;
}

export interface SrInsuredMember {
  relation: string;
  name: string;
  gender: string;
  dob: string;
  occupation: string;
  height: string;
  weight: string;
  annualIncome: string;
  sufferingFrom: string;
}

export interface SrTransaction {
  txnTime: string;
  status: string;
  txnId: string;
  paymentProof: string;
}

export interface SrPaymentEntry {
  paymentMode: string;
  amount: string;
  subAmount: string;
  transactionId: string;
  chequeNumber: string;
  linkedPolicy: string;
}

export interface SrDealerUser {
  name: string;
  email: string;
  mobile: string;
}

export interface SrDealerDetails {
  gcdCode: string;
  mobile: string;
  address: string;
  rap: string;
  mPosGcd: string;
  mPosName: string;
  users: SrDealerUser[];
}

export interface SrProposerDetails {
  gender: string;
  dob: string;
  maritalStatus: string;
  altMobile: string;
  altEmail: string;
  address: string;
  pincode: string;
  state: string;
  city: string;
  area: string;
  aadhaar: string;
  annualIncome: string;
  occupation: string;
  gstNumber: string;
  panCard: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeAge: string;
}

export interface SrPreviousPolicy {
  previousPolicyNo: string;
  policyExpiryDate: string;
  previousInsurer: string;
  portReason: string;
  gibplPreviousPolicy: string;
}

export interface SrPaymentReminder {
  paymentNumber: string;
  toBeCollected: string;
  defaultDueDate: string;
  actualReceivedDate: string;
  status: string;
}

export interface SrQuote {
  insurer: string;
  planName: string;
  tenure: string;
  planType: string;
  baseCoverage: string;
  topupCoverage: string;
  totalCoverage: string;
  deductibleAmount: string;
  policyStartDate: string;
  policyEndDate: string;
  premiumAmount: string;
  totalPremium: string;
  tax: string;
  paymentMode: string;
  policyCaseId: string;
  healthVisitId: string;
}

export interface SrRequest {
  id: string;
  ticketDisplayId: string;
  requestDate: string;
  customerName: string;
  mobile: string;
  email: string;
  channelType: string;
  subSource: string;
  ageingLabel: string;
  ageingLevel: SrAgeingLevel;
  channelPartner: string;
  city: string;
  caseTag: string;
  policyTag: string;
  policyNumber: string;
  insurerName: string;
  assignedTo: string;

  proposerName: string;
  caseType: string;
  statusSel: string;
  nstpReason: string;
  medium: string;
  policyType: string;
  planType: string;
  policySubSource: string;
  dealerName: string;
  proposalNo: string;
  businessType: string;
  freshDeskId: string;
  groupPolicyType: string;
  medicalType: string;
  preRequestId: string;
  brokerName: string;
  localIssuance: string;
  crossSell: string;

  insuredMembers: SrInsuredMember[];
  quote: SrQuote;
  transactions: SrTransaction[];
  paymentReminders: SrPaymentReminder[];
  payments: SrPaymentEntry[];
  dealerDetails: SrDealerDetails;
  proposerDetails: SrProposerDetails;
  previousPolicy: SrPreviousPolicy;

  communication: boolean;
  pendingReason: string;
  pendingWith: string;
  remarks: string;
  activityLog: SrActivityLogEntry[];
}

export interface SrFilters {
  reqId: string;
  policyNumber: string;
  proposalNumber: string;
  customerName: string;
  mobile: string;
  paymentMode: string;
  email: string;
  caseType: string;
  insurer: string;
  medium: string;
  bookingDate: string;
  requestedFrom: string;
  requestedTo: string;
  status: string;
  policyType: string;
  businessType: string;
  source: string;

  dealerName: string;
  channelType: string;
  subSource: string;
  assignee: string;
  groupType: string;
  retailType: string;
  medicalType: string;
  bookedBy: string;

  cancellationFrom: string;
  cancellationTo: string;
  dealerMVT: string;
  isBulkUploaded: string;
  policyEndFrom: string;
  policyEndTo: string;
  paymentFrom: string;
  paymentTo: string;
  paymentMethod: string;

  myTickets: boolean;
}

export type SrQuickTab = 'All' | 'Unbooked (STP)' | 'Upcoming Renewals' | 'Pre QC';

// ---- Create Health Request (offline health lead form) ----

export type ChrMemberType = 'Adult' | 'Child';

export interface ChrInsuredMember {
  memberType: ChrMemberType;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  relationship: string;
  pedDetails: string[];
}

export interface ChrFormState {
  policyMode: 'retail' | 'group';
  brokerName: string;
  caseType: 'New' | 'Renewal' | 'Port Fresh' | 'Port Renewal' | '';
  retailType: 'RMC' | 'RPA';
  policyType: 'NSTP' | 'STP' | '';
  policyDocAvailable: 'Yes' | 'No' | '';
  policyDocFileName: string;
  insurerName: string;
  adults: string;
  children: string;

  // Case-type conditional fields (Renewal / Port Fresh / Port Renewal)
  previousPolicyNumber: string;
  firstInceptionDate: string;
  gibplPreviousPolicy: 'Yes' | 'No' | '';
  medicalRequired: 'Yes' | 'No' | '';

  dealerCode: string;
  fusionLead: 'Yes' | 'No' | '';
  localIssuance: 'Yes' | 'No' | '';
  crossSell: 'Yes' | 'No' | '';

  proposerFirstName: string;
  proposerLastName: string;
  proposerDob: string;
  gender: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  area: string;
  proposerSameAsInsurer: boolean;
  insuredMembers: ChrInsuredMember[];

  planName: string;
  policyTenure: string;
  sumInsured: string;
  paymentMode: 'Online' | 'Cheque' | 'Demand Draft' | '';
  paymentDate: string;
  proposalNumber: string;

  // Cheque payment conditional fields
  chequeNumber: string;
  chequeBank: string;
  chequeCopyFileName: string;
  chequeAckFileName: string;
  chequeAmount: string;
  chequeDate: string;

  // EMI conditional fields
  emiYesNo: 'Yes' | 'No' | '';
  paymentFrequency: string;
  ecsType: 'Yes' | 'No' | '';

  totalPremium: string;
}

// ---- Allocation Buckets & Rules (Health) ----

export interface AbLogEntry {
  text: string;
  by: string;
  at: string;
}

export interface AbBucket {
  id: string;
  name: string;
  desc: string;
  status: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  users: string[];
  log: AbLogEntry[];
}

export interface AbFilters {
  name: string;
  status: 'all' | 'on' | 'off';
  createdBy: string;
  createdDate: string;
  updatedDate: string;
}

export type ArFieldKey = 'caseType' | 'source' | 'insurer' | 'premiumBucket';

export interface ArField {
  field: ArFieldKey | '';
  value: string | string[];
  confirmed: boolean;
}

export interface AbRule {
  id: string;
  name: string;
  module: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  linkedBucket: string;
  maxTickets: number;
  productType: string;
  fields: { field: ArFieldKey; value: string | string[] }[];
  log: AbLogEntry[];
}

export interface ArFilters {
  name: string;
  module: string;
  status: 'all' | 'active' | 'inactive';
  createdFrom: string;
  createdTo: string;
  updatedFrom: string;
  updatedTo: string;
  createdBy: string;
  linkBucket: string;
}

// ---- QC Dashboard (Health) ----

export type QcPersona = 'executive' | 'tl' | 'manager';
export type QcPeriod = 'today' | 'week' | 'month' | 'custom';
export type QcTab = 'dashboard' | 'hierarchy';

export interface QcCase {
  id: string;
  leadId: string;
  requestId: string;
  executive: string;
  requestDT: string;
  statusKey: string;
  insurer: string;
  caseType: string;
  source: string;
  productType: string;
  customerName: string;
  tatDays: number;
  premium: number;
}

export interface QcFilters {
  dateFrom: string;
  dateTo: string;
  caseType: string;
  premiumOrNop: 'premium' | 'nop';
  productType: string;
  source: string;
  executive: string;
  insurer: string;
}

export interface QcDrilldown {
  statusKey: string;
  statusLabel: string;
  tatBucket: 'breached' | 'b0_3' | 'b4_5' | 'b6_10' | 'total';
}
