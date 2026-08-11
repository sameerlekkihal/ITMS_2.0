import type { AppUser, AppRole, IpApprover, IpUserRequest, IpLogin, WfData, CuRequest, SrRequest, AbBucket, AbRule, ArFieldKey, QcCase } from '../types';

export const AV_COLORS = ['#6366f1', '#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16'];

export const ROLE_STYLE: Record<string, { bg: string; color: string }> = {
  Admin: { bg: '#ede9fe', color: '#5b21b6' },
  Manager: { bg: '#fce7f3', color: '#9d174d' },
  Agent: { bg: '#dbeafe', color: '#1e40af' },
  Ops: { bg: '#fef3c7', color: '#92400e' },
};

export const PERMS_LIST = ['View Users', 'Edit Users', 'Delete Users', 'Manage Roles', 'Policy Access', 'Claims Access', 'MIS Upload', 'Reports', 'Dashboard', 'Recon Access', 'Endorsement', 'Offline Journey'];

export const LOG_ICONS: Record<string, string> = { edit: '✏️', create: '✅', delete: '🗑️', perm: '🔑', login: '🔓', toggle: '🔄' };
export const LOG_DOT_BG: Record<string, string> = { create: '#dcfce7', perm: '#ede9fe', edit: '#dbeafe', login: '#fef3c7', toggle: '#e0f2fe' };

export const ADDED_BY = ['Super Admin · Jijo John', 'Admin · Priya Nair', 'Manager · Rahul Mehta', 'Admin · Priya Nair', 'Super Admin · Jijo John', 'Manager · Rahul Mehta', 'Super Admin · Jijo John', 'Admin · Priya Nair', 'Super Admin · Jijo John', 'Admin · Priya Nair', 'Manager · Rahul Mehta', 'Super Admin · Jijo John'];

export const INIT_USERS: AppUser[] = [
  { id: 1, name: 'Dinesh Vishnoi', email: 'dinesh.v@id.in', mobile: '9194003321', role: 'Admin', type: 'ITMS', added: '2026-04-21', active: true },
  { id: 2, name: 'Sandhya Sharma', email: 'sandhya.s@id.in', mobile: '9698088532', role: 'Manager', type: 'ITMS', added: '2026-04-21', active: true },
  { id: 3, name: 'Keshab Das', email: 'keshab.d@id.in', mobile: '9698046354', role: 'Agent', type: 'ITMS', added: '2026-04-21', active: true },
  { id: 4, name: 'Danish Ahmad Bhat', email: 'danish.b@id.in', mobile: '9698041235', role: 'Ops', type: 'POS', added: '2026-04-21', active: true },
  { id: 5, name: 'Manju Sharma', email: 'manju.s@id.in', mobile: '9699921134', role: 'Agent', type: 'ITMS', added: '2026-04-21', active: true },
  { id: 6, name: 'Sadab Khan', email: 'sadab.k@id.in', mobile: '9617231645', role: 'Ops', type: 'LMS', added: '2026-04-21', active: false },
  { id: 7, name: 'Sanjay Ojha', email: 'sanjay.o@id.in', mobile: '9698209385', role: 'Manager', type: 'ITMS', added: '2026-04-20', active: true },
  { id: 8, name: 'Priya Nair', email: 'priya.n@id.in', mobile: '9887766551', role: 'Admin', type: 'ITMS', added: '2026-04-20', active: true },
  { id: 9, name: 'Rahul Mehta', email: 'rahul.m@id.in', mobile: '9887766552', role: 'Agent', type: 'POS', added: '2026-04-19', active: false },
  { id: 10, name: 'Anjali Singh', email: 'anjali.s@id.in', mobile: '9887766553', role: 'Ops', type: 'ITMS', added: '2026-04-19', active: true },
  { id: 11, name: 'Vikram Patel', email: 'vikram.p@id.in', mobile: '9887766554', role: 'Manager', type: 'LMS', added: '2026-04-18', active: true },
  { id: 12, name: 'Deepa Krishnan', email: 'deepa.k@id.in', mobile: '9887766555', role: 'Agent', type: 'ITMS', added: '2026-04-18', active: true },
];

export const INIT_ROLES: AppRole[] = [
  { id: 1, name: 'RPA BOT', product: 'Insurance', ticket: 'Motor Online', addedBy: 'Umardeen', added: '2026-03-12', active: true, autoLogout: false },
  { id: 2, name: 'RPA Auto executor', product: 'Insurance', ticket: 'Motor Offline Punching', addedBy: 'Umardeen', added: '2025-12-16', active: true, autoLogout: false },
  { id: 3, name: 'Business Analytics manager without download', product: 'Insurance', ticket: 'Motor Online', addedBy: 'Jijo John', added: '2025-10-21', active: true, autoLogout: false },
  { id: 4, name: 'Communication2', product: 'Insurance', ticket: 'Motor Online', addedBy: 'Deep Chand', added: '2025-09-30', active: true, autoLogout: false },
  { id: 5, name: 'Ops Policy MIS recon without download', product: 'Insurance', ticket: 'Motor Online', addedBy: 'Jijo John', added: '2025-05-30', active: true, autoLogout: false },
  { id: 6, name: 'Lead Motor Ops without Download', product: 'Insurance', ticket: 'Motor Online', addedBy: 'Jijo John', added: '2025-05-29', active: true, autoLogout: true },
  { id: 7, name: 'Franchise Leader', product: 'Insurance', ticket: 'Insurance_Sales', addedBy: 'N/A', added: '2025-05-14', active: false, autoLogout: false },
  { id: 8, name: 'Regional Head (DSA)', product: 'Insurance', ticket: 'Insurance_Sales', addedBy: 'N/A', added: '2025-04-21', active: true, autoLogout: false },
  { id: 9, name: 'SME ops executive and dealer movement', product: 'Insurance', ticket: 'Motor Online', addedBy: 'Jijo John', added: '2025-01-28', active: true, autoLogout: false },
  { id: 10, name: 'Health Claims Reviewer', product: 'Health', ticket: 'Health Online', addedBy: 'Priya Nair', added: '2024-11-10', active: true, autoLogout: false },
  { id: 11, name: 'Life Policy Issuer', product: 'Life', ticket: 'Life Online', addedBy: 'Rahul Mehta', added: '2024-09-05', active: true, autoLogout: true },
  { id: 12, name: 'Motor Endorsement Agent', product: 'Insurance', ticket: 'Motor Online', addedBy: 'Jijo John', added: '2024-07-18', active: false, autoLogout: false },
];

export const RM_PERM_MODULES = [
  { section: 'Dashboard & Core', items: ['Main Dashboard', 'Notification Dashboard', 'Vision Board', 'ATC Dashboard'] },
  { section: 'User Management', items: ['Users', 'Roles', 'Create ITMS User', 'User Attendance', 'Working Hour Config'] },
  { section: 'Policy Register', items: ['Motor — Online', 'Motor — Offline', 'Health — Online', 'Life — Online'] },
  { section: 'Claims', items: ['Claims Register', 'Claims QC', 'Claims Recon'] },
  { section: 'MIS & Reports', items: ['MIS Upload', 'Reports', 'Upload GCD IDs'] },
  { section: 'Operations', items: ['Insurer Portal', 'Workflow', 'City Region Mapping', 'Endorsement Backend'] },
];

export const WF: WfData = {
  Insurance: {
    'Motor Online': {
      sub: null,
      statuses: ['Payment-Link Generated', 'Payment-Done', 'Payment-Failed', 'Doc Pending', 'Doc Verified', 'Policy Issued', 'Policy Cancelled'],
      transitions: { 'Payment-Link Generated': ['Payment-Done', 'Payment-Failed'], 'Payment-Done': ['Doc Pending'], 'Payment-Failed': ['Payment-Link Generated'], 'Doc Pending': ['Doc Verified'], 'Doc Verified': ['Policy Issued'], 'Policy Issued': ['Policy Cancelled'], 'Policy Cancelled': ['Payment-Link Generated'] },
    },
    'Motor Offline Punching': {
      sub: null,
      statuses: ['Draft', 'Pending Verification', 'Verified', 'Rejected', 'Policy Issued', 'Policy Cancelled'],
      transitions: { Draft: ['Pending Verification', 'Rejected'], 'Pending Verification': ['Verified', 'Rejected'], Verified: ['Policy Issued'], Rejected: ['Draft'], 'Policy Issued': ['Policy Cancelled'], 'Policy Cancelled': ['Draft'] },
    },
    Health: {
      sub: ['Health Online', 'Health Offline'],
      statuses: ['Proposal Submitted', 'Payment Pending', 'Payment Done', 'Underwriting', 'Policy Issued', 'Policy Rejected'],
      transitions: { 'Proposal Submitted': ['Payment Pending', 'Policy Rejected'], 'Payment Pending': ['Payment Done', 'Policy Rejected'], 'Payment Done': ['Underwriting'], Underwriting: ['Policy Issued', 'Policy Rejected'], 'Policy Issued': [], 'Policy Rejected': ['Proposal Submitted'] },
    },
    Life: {
      sub: ['Term Life', 'ULIP', 'Endowment'],
      statuses: ['Proposal Submitted', 'Medical Pending', 'Medical Done', 'Policy Issued', 'Policy Lapsed'],
      transitions: { 'Proposal Submitted': ['Medical Pending'], 'Medical Pending': ['Medical Done'], 'Medical Done': ['Policy Issued'], 'Policy Issued': ['Policy Lapsed'], 'Policy Lapsed': ['Policy Issued'] },
    },
    Travel: {
      sub: null,
      statuses: ['Quote Generated', 'Policy Issued', 'Claim Filed', 'Claim Settled'],
      transitions: { 'Quote Generated': ['Policy Issued'], 'Policy Issued': ['Claim Filed'], 'Claim Filed': ['Claim Settled'], 'Claim Settled': [] },
    },
    Claim: {
      sub: null,
      statuses: ['Claim Registered', 'Under Review', 'Approved', 'Rejected', 'Settled'],
      transitions: { 'Claim Registered': ['Under Review'], 'Under Review': ['Approved', 'Rejected'], Approved: ['Settled'], Rejected: ['Claim Registered'], Settled: [] },
    },
  },
};

export const IP_LOGINS: IpLogin[] = [
  { id: 19969, loginId: 'IMD10709860026', insurer: 'Liberty General Insurance Company Limited', status: 'Mapped', imd: 'N/A', gcd: 'GID342750' },
  { id: 19968, loginId: 'LC288-334', insurer: 'Shriram General Insurance', status: 'Mapped', imd: 'N/A', gcd: 'GID182263' },
  { id: 19967, loginId: 'GIRLTD002640', insurer: 'United India Insurance Company Limited', status: 'Mapped', imd: 'N/A', gcd: 'DCD14166' },
  { id: 19966, loginId: '68216800', insurer: 'Digit General Insurance Limited', status: 'Mapped', imd: '1218733', gcd: 'GID182263' },
  { id: 19961, loginId: '32274300', insurer: 'Digit General Insurance Limited', status: 'Mapped', imd: '1218731', gcd: 'GID277502' },
  { id: 19959, loginId: 'RELIANCE001', insurer: 'Reliance General Insurance', status: 'Unmapped', imd: 'N/A', gcd: '—' },
  { id: 19958, loginId: 'BAJAJ78432', insurer: 'Bajaj Allianz General Insurance', status: 'Unmapped', imd: 'N/A', gcd: '—' },
];

export const IP_STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'Approval Pending - Admin': { bg: '#fef3c7', color: '#92400e' },
  'Approval Pending - ZH': { bg: '#ede9fe', color: '#5b21b6' },
  'Rejected - ZH': { bg: '#fee2e2', color: '#991b1b' },
  'Rejected - Admin': { bg: '#fee2e2', color: '#991b1b' },
  Closed: { bg: '#f3f4f6', color: '#374151' },
  Mapped: { bg: '#dcfce7', color: '#166534' },
  Unmapped: { bg: '#fef3c7', color: '#92400e' },
};

export const INIT_IP_APPROVERS: IpApprover[] = [
  { label: 'Approver 1', value: 'Zonal Head (DSA)' },
  { label: 'Approver 2', value: 'State Head (DSA)' },
  { label: 'Admin', value: 'Chhavi Sharma (chhavi.sharma@insurancedekho.com)' },
];

export const INIT_IP_USERS: IpUserRequest[] = [
  { id: '6012727', insurer: 'United India Insurance Company Limited', opBy: 'Shakuntala Sharma(DSA)', gcd: 'GCD9774', date: '2026-05-06 15:52', status: 'Approval Pending - Admin' },
  { id: '6012579', insurer: 'United India Insurance Company Limited', opBy: 'Mohammad Sadiq', gcd: 'GID221738', date: '2026-05-06 14:27', status: 'Approval Pending - Admin' },
  { id: '6007139', insurer: 'United India Insurance Company Limited', opBy: 'Kulanthaivel Marappan', gcd: 'GID312811', date: '2026-05-05 17:12', status: 'Approval Pending - Admin' },
  { id: '5999321', insurer: 'HDFC Ergo', opBy: 'Radhika Gupta', gcd: 'GCD101937', date: '2026-04-22 12:42', status: 'Closed' },
  { id: '5990100', insurer: 'Reliance General', opBy: 'Meena Kamboj', gcd: 'GID202285', date: '2026-04-18 10:00', status: 'Approval Pending - ZH' },
  { id: '5990099', insurer: 'Digit General Insurance', opBy: 'Vicky', gcd: 'GID193435', date: '2026-04-18 09:30', status: 'Rejected - ZH' },
];

export const MODULE_CARDS = [
  { key: 'users', page: 'users' as const, previewBg: 'linear-gradient(135deg, #0f1115 0%, #1e293b 100%)', ts: '2 min ago', iconBg: '#1e293b', icon: '👥', statusLabel: 'Active', label: 'User Management', desc: 'Create, edit and manage platform users, assign roles and track activity logs.', stat: '148 users · 134 active', ctaColor: '#e8192c', cta: 'Open →', opacity: 1, comingSoon: false },
  { key: 'roles', page: 'roles' as const, previewBg: 'linear-gradient(135deg, #1a0a0b 0%, #3d0e13 100%)', ts: '18 min ago', iconBg: '#fff0f1', icon: '🔐', statusLabel: 'Active', label: 'Role Management', desc: 'Define roles, set granular module permissions and control access hierarchy.', stat: '12 roles · 2 pending', ctaColor: '#e8192c', cta: 'Open →', opacity: 1, comingSoon: false },
  { key: 'policy', page: null, previewBg: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)', ts: 'Yesterday', iconBg: '#dbeafe', icon: '📋', statusLabel: 'Coming Soon', label: 'Policy Register', desc: 'Manage motor, health, life and other product policy records end-to-end.', stat: 'Module in development', ctaColor: '#9ca3af', cta: 'Soon →', opacity: .7, comingSoon: true, toast: 'Policy Register module coming soon!' },
  { key: 'claims', page: null, previewBg: 'linear-gradient(135deg, #0d1f0e 0%, #1a3d1c 100%)', ts: '2 days ago', iconBg: '#dcfce7', icon: '🩺', statusLabel: 'Coming Soon', label: 'Claims Backend', desc: 'Process and track insurance claims across all product verticals.', stat: 'Module in development', ctaColor: '#9ca3af', cta: 'Soon →', opacity: .7, comingSoon: true, toast: 'Claims Backend coming soon!' },
  { key: 'mis', page: null, previewBg: 'linear-gradient(135deg, #1a1500 0%, #3d3000 100%)', ts: '3 days ago', iconBg: '#fef3c7', icon: '📤', statusLabel: 'Coming Soon', label: 'MIS Uploaders', desc: 'Bulk upload management information system files for processing and reconciliation.', stat: 'Module in development', ctaColor: '#9ca3af', cta: 'Soon →', opacity: .7, comingSoon: true, toast: 'MIS Uploaders coming soon!' },
  { key: 'recon', page: null, previewBg: 'linear-gradient(135deg, #12091a 0%, #2d1455 100%)', ts: 'Last week', iconBg: '#ede9fe', icon: '⚖️', statusLabel: 'Coming Soon', label: 'Recon System', desc: 'Automated reconciliation of payments, policies and financial records.', stat: 'Module in development', ctaColor: '#9ca3af', cta: 'Soon →', opacity: .7, comingSoon: true, toast: 'Recon System coming soon!' },
];

export const CU_PERM_KEY = 'User Management|Create ITMS User';

export const CU_STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'Pending with L2': { bg: '#fef3c7', color: '#92400e' },
  'User Created': { bg: '#dcfce7', color: '#166534' },
  Rejected: { bg: '#fee2e2', color: '#991b1b' },
};

export const CU_REJECT_REASONS = ['Duplicate request — user already exists', 'Employee code not verified with HR', 'Role requested not applicable', 'Insufficient details in request', 'Others'];

export const CU_REGIONS = ['North', 'South', 'East', 'West', 'Central'];

export const INIT_USER_REQUESTS: CuRequest[] = [
  {
    id: 'REQ-4021', empCode: 'ID20984', email: 'nikhil.raj@insurancedekho.com', mobile: '9811204471',
    roleMode: 'role', role: 'Ops Policy MIS recon without download', equivalentEmail: '',
    remark: 'Joining the Motor Ops recon team from 6 May. Needs MIS download disabled.',
    raisedBy: 'Priya Nair (L1 · Admin)', raisedAt: '2026-05-04 11:20', status: 'Pending with L2',
    config: null, rejectReason: '',
    logs: [{ type: 'create', action: 'Request raised for ID20984 · nikhil.raj@insurancedekho.com', by: 'Priya Nair (L1 · Admin)', time: '2026-05-04 11:20' }],
  },
  {
    id: 'REQ-4018', empCode: 'ID20961', email: 'sneha.kulkarni@insurancedekho.com', mobile: '9702118834',
    roleMode: 'equivalent', role: '', equivalentEmail: 'sandhya.s@id.in',
    remark: 'Replicate access of Sandhya — same desk, South zone.',
    raisedBy: 'Rahul Mehta (L1 · Manager)', raisedAt: '2026-05-02 16:05', status: 'User Created',
    config: { name: 'Sneha Kulkarni', userType: 'ITMS', role: 'Manager', region: 'South', teamOnly: true, autoLogout: false },
    rejectReason: '',
    logs: [
      { type: 'create', action: 'Request raised for ID20961 · sneha.kulkarni@insurancedekho.com', by: 'Rahul Mehta (L1 · Manager)', time: '2026-05-02 16:05' },
      { type: 'perm', action: 'Role resolved from equivalent user sandhya.s@id.in → Manager', by: 'Jijo John (L2 · ITMS Admin)', time: '2026-05-03 10:12' },
      { type: 'create', action: 'User account created — ITMS · Manager · South', by: 'Jijo John (L2 · ITMS Admin)', time: '2026-05-03 10:14' },
      { type: 'login', action: 'Confirmation email triggered to requester and new user', by: 'System', time: '2026-05-03 10:14' },
    ],
  },
  {
    id: 'REQ-4009', empCode: 'ID20877', email: 'arjun.desai@insurancedekho.com', mobile: '9945620017',
    roleMode: 'role', role: 'RPA BOT', equivalentEmail: '',
    remark: 'Temporary bot access for offline punching drive.',
    raisedBy: 'Priya Nair (L1 · Admin)', raisedAt: '2026-04-28 09:40', status: 'Rejected',
    config: null, rejectReason: 'Role requested not applicable',
    logs: [
      { type: 'create', action: 'Request raised for ID20877 · arjun.desai@insurancedekho.com', by: 'Priya Nair (L1 · Admin)', time: '2026-04-28 09:40' },
      { type: 'delete', action: 'Request rejected — Role requested not applicable', by: 'Jijo John (L2 · ITMS Admin)', time: '2026-04-28 15:22' },
      { type: 'login', action: 'Rejection email triggered to requester', by: 'System', time: '2026-04-28 15:22' },
    ],
  },
];

export const IP_INSURERS = ['United India Insurance Company Limited', 'HDFC Ergo', 'Digit General Insurance', 'Reliance General'];
export const IP_STATUSES = ['Approval Pending - ZH', 'Approval Pending - Admin', 'Rejected - ZH', 'Rejected - Admin', 'Closed'];
export const IP_REJECT_REASONS = ['Invalid Request', 'Insurer not serviceable', 'Duplicate Request', 'Others'];

// ---- Service Requests / Health case module ----

export const SR_AGENTS = ['Lalita Bisht', 'Dheeraj Shukla', 'Shah Nidhi', 'Devmurari Pawel', 'Praphull Kumar'];
export const SR_INSURERS = ['ICICI Lombard', 'Star Health', 'Universal Sompo General Insurance Co. Ltd.', 'Aditya Birla Health Insurance Co Ltd', 'Bajaj Allianz General Insurance Co Ltd', 'HDFC ERGO General Insurance Company'];
export const SR_CASE_TYPES = ['Medical', 'Welcome Call', 'Booked Verification Call', 'Proposal Payment Link', 'Payment Done Policy'];
export const SR_STATUS_OPTIONS = ['Pending', 'Done', 'Generated', 'Unavailable', 'In Progress', 'Completed'];
export const SR_POLICY_TYPES = ['Base Plan', 'Super Topup', 'Family Floater'];
export const SR_BUSINESS_TYPES = ['Retail', 'Group'];
export const SR_SOURCES = ['POS', 'Online', 'CRM Offline'];
export const SR_PAYMENT_MODES = ['online', 'offline', 'NEFT'];
export const SR_PAYMENT_METHODS = ['Payment Link', 'Netbanking', 'Card', 'UPI'];
export const SR_PENDING_REASONS = ['Case not picked', 'Customer not reachable', 'Documents awaited', 'Payment awaited', 'KYC pending', 'Others'];
export const SR_PENDING_WITH = ['Lalita Bisht', 'Dheeraj Shukla', 'Shah Nidhi', 'Devmurari Pawel', 'Praphull Kumar', 'Zonal Ops Team', 'Customer'];

export const SR_AGEING_COLOR: Record<string, { bg: string; color: string }> = {
  fresh: { bg: '#dcfce7', color: '#166534' },
  aging: { bg: '#fef3c7', color: '#92400e' },
  urgent: { bg: '#fee2e2', color: '#991b1b' },
};

export const SR_STATUS_COLOR: Record<string, { bg: string; color: string }> = {
  'Medical Pending': { bg: '#fef3c7', color: '#92400e' },
  'Booked Verification Call Done': { bg: '#dcfce7', color: '#166534' },
  'Booked Verification Call Pending': { bg: '#fef3c7', color: '#92400e' },
  'Proposal Payment Link Generated': { bg: '#dbeafe', color: '#1e40af' },
  'Payment Done Policy Unavailable': { bg: '#fee2e2', color: '#991b1b' },
};

const anitaLog = [
  { type: 'edit' as const, text: 'Medical Pending Marked by Praphull Kumar. Comment: Pending Reason: Case not picked', by: 'Praphull Kumar', time: 'Fri, 31 Jul 2026 · 6:18 PM' },
  { type: 'toggle' as const, text: 'Welcome Call Done Marked by Praphull Kumar', by: 'Praphull Kumar', time: 'Fri, 31 Jul 2026 · 6:18 PM' },
  { type: 'create' as const, text: 'Welcome Call Pending Marked by Non-ITMS User. Comment: Pending Reason: Case not picked, Pending With: —', by: 'Non-ITMS User', time: 'Fri, 31 Jul 2026 · 3:05 PM' },
  { type: 'delete' as const, text: 'Payment Done Policy Unavailable Marked by Non-ITMS User. Comment: Pending Reason: KYC Error / Pending, Pending With: —', by: 'Non-ITMS User', time: 'Fri, 31 Jul 2026 · 3:05 PM' },
  { type: 'edit' as const, text: 'Policy detail is updated by Non-ITMS User', by: 'Non-ITMS User', time: 'Fri, 31 Jul 2026 · 3:02 PM' },
  { type: 'perm' as const, text: 'Payment Link Generated Marked by Non-ITMS User. Comment: Pending Reason: NA, Pending With: —', by: 'Non-ITMS User', time: 'Fri, 31 Jul 2026 · 3:02 PM' },
  { type: 'assign' as const, text: 'Assigned By Non-ITMS User', by: 'Non-ITMS User', time: 'Fri, 31 Jul 2026 · 2:33 PM' },
];

function mkLighterLog(status: string, by: string): SrRequest['activityLog'] {
  return [
    { type: 'edit', text: `${status} Marked by ${by}`, by, time: 'Fri, 31 Jul 2026 · 6:00 PM' },
    { type: 'create', text: `Request routed to ${by} for follow-up`, by: 'System', time: 'Fri, 31 Jul 2026 · 3:10 PM' },
    { type: 'assign', text: `Assigned By Non-ITMS User`, by: 'Non-ITMS User', time: 'Fri, 31 Jul 2026 · 2:20 PM' },
  ];
}

// ---- Create Health List (offline health lead form) ----

export const SR_BROKERS = ['GIBPL', 'D2C', 'iAnd'];
export const CHR_CASE_TYPES = ['New', 'Renewal', 'Port Fresh', 'Port Renewal'];
export const CHR_GENDERS = ['Male', 'Female', 'Other'];
export const CHR_TENURES = ['1 Y', '2 Y', '3 Y'];
export const CHR_SUM_INSURED = ['300000', '500000', '1000000', '1500000', '2500000', '5000000'];
export const CHR_COUNT_OPTIONS = ['0', '1', '2', '3', '4', '5'];
export const CHR_PAYMENT_MODES = ['Online', 'Cheque', 'Demand Draft'];
export const CHR_PAYMENT_FREQUENCY = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
export const CHR_ISSUING_BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'IDFC First Bank', 'IndusInd Bank', 'Yes Bank', 'Union Bank of India'];

export const CHR_RELATIONSHIPS = [
  'Aunt', 'Brother', 'Brother In Law', 'Daughter', 'Daughter In Law', 'Dependent Child', 'Dependent Parent', 'Employer-Employee',
  'Father', 'Father In Law', 'Grand Daughter', 'Grand Father', 'Grand Mother', 'Grand Son', 'Guardian', 'HUF', 'Husband', 'Infant',
  'Mother', 'Mother In Law', 'Nephew', 'Niece', 'Others', 'Parent In Law', 'Partnership', 'Proprietorship', 'Self', 'Sibling',
  'Sister', 'Sister In Law', 'Son', 'Son In Law', 'Spouse', 'Uncle', 'Wife',
];

export const CHR_PED_OPTIONS = [
  'Anemia', 'Appendicectomy', 'Asthma', 'Cancer', 'Congenital Disease', 'Depression', 'Diabetes', 'Fibroid Removal', 'Heart Disease',
  'High Blood Pressure', 'Respiratory Disorder', 'Thyroid Problem', 'Tuberculosis', 'Ovary Lumps', 'Fracture - Hand', 'Fracture - Leg',
  'Accident', 'Gallbladder Removal', 'Stone', 'Brain Stroke', 'Uterus Removal', 'Tumor', 'Lung Infection', 'Ulcerative Colitis',
  'ENT Issue', 'Eye Issue', 'Migraine', 'Plantar Fasciitis', 'Sinusitis', 'Allergic Rhinitis', 'Cataract', 'Cholesterol', 'UTI',
  'Obesity', 'Laparoscopic Surgery', 'Acute Gastro', 'Covid', 'Ulcer', 'Cholera', 'Teeth Problem', 'Slip Disc', 'Hernia', 'Sleep Apnea',
  'Deviated Nasal Septum', 'Cold', 'Cough', 'Fever', 'Kawasaki Disease', 'Hysterectomy',
];

export const CHR_PLANS_BY_INSURER: Record<string, string[]> = {
  'ICICI Lombard': ['Elevate', 'Health Booster', 'Golden Shield'],
  'Star Health': ['Assure', 'Family Health Optima', 'Senior Citizen Red Carpet'],
  'Universal Sompo General Insurance Co. Ltd.': ['Complete Health', 'Individual Health'],
  'Aditya Birla Health Insurance Co Ltd': ['Activ Health', 'Activ Care'],
  'Bajaj Allianz General Insurance Co Ltd': ['Health Guard', 'Health Ensurance'],
  'HDFC ERGO General Insurance Company': ['Optima Secure', 'my:health Suraksha'],
};

export const CHR_PLAN_TYPE_LOOKUP: Record<string, string> = {
  Elevate: 'Base Plan', 'Health Booster': 'Super Topup', 'Golden Shield': 'Family Floater',
  Assure: 'Base Plan', 'Family Health Optima': 'Family Floater', 'Senior Citizen Red Carpet': 'Base Plan',
  'Complete Health': 'Family Floater', 'Individual Health': 'Base Plan',
  'Activ Health': 'Base Plan', 'Activ Care': 'Family Floater',
  'Health Guard': 'Base Plan', 'Health Ensurance': 'Super Topup',
  'Optima Secure': 'Base Plan', 'my:health Suraksha': 'Family Floater',
};

export const CHR_DEALER_LOOKUP: Record<string, { name: string; city: string }> = {
  GID342750: { name: 'Mrs Rajni Devi', city: 'New Delhi' },
  GID182263: { name: 'Shinde Ajit Pralhad', city: 'Palus' },
  GID277502: { name: 'Bhyrappa V H (POS)', city: 'Bangalore' },
  GID221738: { name: 'Param Kaushal Shah', city: 'Ahmedabad' },
};

export const CHR_PINCODE_LOOKUP: Record<string, { city: string; state: string; areas: string[] }> = {
  '110001': { city: 'New Delhi', state: 'Delhi', areas: ['Connaught Place', 'Karol Bagh', 'Rajouri Garden'] },
  '400001': { city: 'Mumbai', state: 'Maharashtra', areas: ['Fort', 'Colaba', 'Marine Lines'] },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', areas: ['Lal Darwaja', 'Ellis Bridge', 'Navrangpura'] },
  '560001': { city: 'Bangalore', state: 'Karnataka', areas: ['MG Road', 'Shivajinagar', 'Cubbon Park'] },
  '500001': { city: 'Hyderabad', state: 'Telangana', areas: ['Abids', 'Koti', 'Nampally'] },
};

function mkSimpleQuote(insurer: string, plan: string, premium: string): SrRequest['quote'] {
  return {
    insurer, planName: plan, tenure: '1 Y', planType: 'Base Plan',
    baseCoverage: '500000', topupCoverage: 'N/A', totalCoverage: '500000', deductibleAmount: 'N/A',
    policyStartDate: 'N/A', policyEndDate: 'N/A', premiumAmount: premium, totalPremium: premium,
    tax: 'N/A', paymentMode: 'online', policyCaseId: 'N/A', healthVisitId: 'N/A',
  };
}

export const INIT_SR_REQUESTS: SrRequest[] = [
  {
    id: '44157219', ticketDisplayId: 'INS-H-ON-44157219', requestDate: '2026-07-31 00:00',
    customerName: 'Anita Rawat', mobile: '9811044521', email: 'anita.rawat@example.com', channelType: 'AGENCY', subSource: 'POS', ageingLabel: '6 Mins', ageingLevel: 'fresh',
    channelPartner: 'Mrs Rajni Devi', city: 'New Delhi', caseTag: 'New', policyTag: 'NSTP',
    policyNumber: '0', insurerName: 'ICICI Lombard', assignedTo: 'Lalita Bisht',
    proposerName: 'Anita Rawat', caseType: 'Medical', statusSel: 'Pending', nstpReason: 'N/A',
    medium: 'Online', policyType: 'New', planType: 'Base Plan', policySubSource: 'POS',
    dealerName: 'Mrs Rajni Devi', proposalNo: '4225202604234268', businessType: 'Retail', freshDeskId: '763428',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [
      { relation: 'self', name: 'Mrs. Anita Rawat', gender: 'Female', dob: '1979-11-10', occupation: '', height: '5 ft 1 in', weight: '70', annualIncome: '' },
      { relation: 'spouse', name: 'Mr. Naresh Bhati', gender: 'Male', dob: '1979-08-12', occupation: '', height: '5 ft 7 in', weight: '73', annualIncome: '' },
    ],
    quote: {
      insurer: 'ICICI Lombard', planName: 'Elevate', tenure: '1 Y', planType: 'Base Plan',
      baseCoverage: '1000000', topupCoverage: 'N/A', totalCoverage: '1000000', deductibleAmount: 'N/A',
      policyStartDate: 'N/A', policyEndDate: 'N/A', premiumAmount: '21918', totalPremium: '21918',
      tax: 'N/A', paymentMode: 'online', policyCaseId: '5187bae7-e21d-4fba-b3b2-4515a1bddea0', healthVisitId: '6a6c5cdb24aafb33e073fdf1',
    },
    transactions: [{ txnTime: '2026-07-31', status: 'Success', txnId: 'order_TK3sx8d9FxDsXd', paymentProof: 'N/A' }],
    paymentReminders: [],
    communication: true, pendingReason: 'Case not picked', pendingWith: '', remarks: '', activityLog: anitaLog,
  },
  {
    id: '44151288', ticketDisplayId: 'INS-H-ON-44151288', requestDate: '2026-07-28 00:00',
    customerName: 'Prawesh Kumar Singh', mobile: '9873322110', email: 'prawesh.singh@example.com', channelType: 'AGENCY', subSource: 'POS', ageingLabel: '6 Mins', ageingLevel: 'fresh',
    channelPartner: 'Mrs Rajni Devi', city: 'New Delhi', caseTag: 'New', policyTag: 'NSTP',
    policyNumber: '0', insurerName: 'ICICI Lombard', assignedTo: 'Lalita Bisht',
    proposerName: 'Prawesh Kumar Singh', caseType: 'Medical', statusSel: 'Pending', nstpReason: 'N/A',
    medium: 'Online', policyType: 'New', planType: 'Base Plan', policySubSource: 'POS',
    dealerName: 'Mrs Rajni Devi', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Prawesh Kumar Singh', gender: 'Male', dob: '1985-02-01', occupation: '', height: '5 ft 8 in', weight: '78', annualIncome: '' }],
    quote: mkSimpleQuote('ICICI Lombard', 'Elevate', '18420'),
    transactions: [], paymentReminders: [],
    communication: true, pendingReason: 'Case not picked', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Medical Pending', 'Praphull Kumar'),
  },
  {
    id: '44166993', ticketDisplayId: 'INS-H-ON-44166993', requestDate: '2026-06-17 00:00',
    customerName: 'Nilesh Prakash Shete', mobile: '9422133456', email: 'nilesh.shete@example.com', channelType: 'AGENCY', subSource: 'Online', ageingLabel: '12 Mins', ageingLevel: 'fresh',
    channelPartner: 'Shinde Ajit Pralhad', city: 'Palus', caseTag: 'Renew', policyTag: 'STP',
    policyNumber: '0', insurerName: 'Star Health', assignedTo: 'Dheeraj Shukla',
    proposerName: 'Nilesh Prakash Shete', caseType: 'Proposal Payment Link', statusSel: 'Generated', nstpReason: 'N/A',
    medium: 'Online', policyType: 'Renewal', planType: 'Base Plan', policySubSource: 'Online',
    dealerName: 'Shinde Ajit Pralhad', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Nilesh Prakash Shete', gender: 'Male', dob: '1982-05-19', occupation: '', height: '5 ft 9 in', weight: '76', annualIncome: '' }],
    quote: mkSimpleQuote('Star Health', 'Assure', '14290'),
    transactions: [], paymentReminders: [{ paymentNumber: '1', toBeCollected: '14290', defaultDueDate: '2026-06-20', actualReceivedDate: '', status: 'Awaited' }],
    communication: true, pendingReason: '', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Proposal Payment Link Generated', 'Dheeraj Shukla'),
  },
  {
    id: '44166905', ticketDisplayId: 'INS-H-OFF-44166905', requestDate: '2026-07-31 00:00',
    customerName: 'Bhyrappa V H', mobile: '9845567890', email: 'bhyrappa.vh@example.com', channelType: 'CRM-OFFLINE', subSource: 'CRM Offline', ageingLabel: '15 Mins', ageingLevel: 'aging',
    channelPartner: 'Bhyrappa V H (POS)', city: 'Bangalore', caseTag: 'Renew', policyTag: 'STP',
    policyNumber: '2825/64172218/05/000', insurerName: 'Universal Sompo General Insurance Co. Ltd.', assignedTo: 'Dheeraj Shukla',
    proposerName: 'Bhyrappa V H', caseType: 'Booked Verification Call', statusSel: 'Done', nstpReason: 'N/A',
    medium: 'Offline', policyType: 'Renewal', planType: 'Family Floater', policySubSource: 'CRM Offline',
    dealerName: 'Bhyrappa V H (POS)', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'Yes', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Bhyrappa V H', gender: 'Male', dob: '1975-03-22', occupation: '', height: '5 ft 6 in', weight: '80', annualIncome: '' }],
    quote: mkSimpleQuote('Universal Sompo General Insurance Co. Ltd.', 'Complete Health', '19850'),
    transactions: [{ txnTime: '2026-07-30', status: 'Success', txnId: 'order_UN8ppa22XVs', paymentProof: 'N/A' }], paymentReminders: [],
    communication: false, pendingReason: '', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Booked Verification Call Done', 'Dheeraj Shukla'),
  },
  {
    id: '44166889', ticketDisplayId: 'INS-H-OFF-44166889', requestDate: '2026-07-31 00:00',
    customerName: 'Ashish Babulal Panchal', mobile: '9998001122', email: 'ashish.panchal@example.com', channelType: 'AGENCY', subSource: 'POS', ageingLabel: '15 Mins', ageingLevel: 'aging',
    channelPartner: 'Param Kaushal Shah', city: 'Ahmedabad', caseTag: 'New', policyTag: 'STP',
    policyNumber: '4172/449121556/00/000', insurerName: 'ICICI Lombard', assignedTo: 'Shah Nidhi',
    proposerName: 'Ashish Babulal Panchal', caseType: 'Booked Verification Call', statusSel: 'Pending', nstpReason: 'N/A',
    medium: 'Offline', policyType: 'New', planType: 'Base Plan', policySubSource: 'POS',
    dealerName: 'Param Kaushal Shah', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Ashish Babulal Panchal', gender: 'Male', dob: '1988-09-14', occupation: '', height: '5 ft 7 in', weight: '72', annualIncome: '' }],
    quote: mkSimpleQuote('ICICI Lombard', 'Elevate', '16780'),
    transactions: [], paymentReminders: [],
    communication: true, pendingReason: 'Documents awaited', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Booked Verification Call Pending', 'Shah Nidhi'),
  },
  {
    id: '44166666', ticketDisplayId: 'INS-H-OFF-44166666', requestDate: '2026-07-31 00:00',
    customerName: 'Kotadiya Hematbhai Vithalbhai', mobile: '9727001133', email: 'kotadiya.h@example.com', channelType: 'AGENCY', subSource: 'POS', ageingLabel: '20 Mins', ageingLevel: 'aging',
    channelPartner: 'Donga Punita Bhadreshkumar DSA', city: 'Jamnagar', caseTag: 'Renew', policyTag: 'STP',
    policyNumber: '21-21-0054164-05', insurerName: 'Aditya Birla Health Insurance Co Ltd', assignedTo: 'Lalita Bisht',
    proposerName: 'Kotadiya Hematbhai Vithalbhai', caseType: 'Booked Verification Call', statusSel: 'Done', nstpReason: 'N/A',
    medium: 'Offline', policyType: 'Renewal', planType: 'Super Topup', policySubSource: 'POS',
    dealerName: 'Donga Punita Bhadreshkumar DSA', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Kotadiya Hematbhai Vithalbhai', gender: 'Male', dob: '1970-01-30', occupation: '', height: '5 ft 6 in', weight: '77', annualIncome: '' }],
    quote: mkSimpleQuote('Aditya Birla Health Insurance Co Ltd', 'Activ Health', '22140'),
    transactions: [{ txnTime: '2026-07-29', status: 'Success', txnId: 'order_ADB44zhk', paymentProof: 'N/A' }], paymentReminders: [],
    communication: true, pendingReason: '', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Booked Verification Call Done', 'Lalita Bisht'),
  },
  {
    id: '44166478', ticketDisplayId: 'INS-H-ON-44166478', requestDate: '2026-07-31 00:00',
    customerName: 'Maddi Rambabu', mobile: '9440112233', email: 'maddi.rambabu@example.com', channelType: 'AGENCY', subSource: 'POS', ageingLabel: '24 Mins', ageingLevel: 'aging',
    channelPartner: 'Miss Nakka Vidyavathi', city: 'Hyderabad', caseTag: 'Port Fresh', policyTag: 'NSTP',
    policyNumber: '0', insurerName: 'ICICI Lombard', assignedTo: 'Lalita Bisht',
    proposerName: 'Maddi Rambabu', caseType: 'Medical', statusSel: 'Pending', nstpReason: 'N/A',
    medium: 'Online', policyType: 'Port', planType: 'Base Plan', policySubSource: 'POS',
    dealerName: 'Miss Nakka Vidyavathi', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Maddi Rambabu', gender: 'Male', dob: '1980-06-11', occupation: '', height: '5 ft 5 in', weight: '69', annualIncome: '' }],
    quote: mkSimpleQuote('ICICI Lombard', 'Elevate', '17650'),
    transactions: [], paymentReminders: [],
    communication: true, pendingReason: 'Customer not reachable', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Medical Pending', 'Lalita Bisht'),
  },
  {
    id: '44166451', ticketDisplayId: 'INS-H-OFF-44166451', requestDate: '2026-07-31 00:00',
    customerName: 'Ranjitbhai Chandubhai Patani', mobile: '9998776655', email: 'ranjitbhai.patani@example.com', channelType: 'AGENCY', subSource: 'POS', ageingLabel: '25 Mins', ageingLevel: 'urgent',
    channelPartner: 'Mr Daarrpan Rajeshbhai Shah', city: 'Ahmedabad', caseTag: 'New', policyTag: 'STP',
    policyNumber: '12-8428-0001041978-00', insurerName: 'Bajaj Allianz General Insurance Co Ltd', assignedTo: '',
    proposerName: 'Ranjitbhai Chandubhai Patani', caseType: 'Booked Verification Call', statusSel: 'Pending', nstpReason: 'N/A',
    medium: 'Offline', policyType: 'New', planType: 'Base Plan', policySubSource: 'POS',
    dealerName: 'Mr Daarrpan Rajeshbhai Shah', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Ranjitbhai Chandubhai Patani', gender: 'Male', dob: '1990-12-02', occupation: '', height: '5 ft 8 in', weight: '74', annualIncome: '' }],
    quote: mkSimpleQuote('Bajaj Allianz General Insurance Co Ltd', 'Health Guard', '15920'),
    transactions: [], paymentReminders: [],
    communication: true, pendingReason: 'Case not picked', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Booked Verification Call Pending', 'Unassigned'),
  },
  {
    id: '44166304', ticketDisplayId: 'INS-H-OFF-44166304', requestDate: '2026-07-31 00:00',
    customerName: 'Mahesh Kumar Singh', mobile: '9835512233', email: 'mahesh.singh@example.com', channelType: 'AGENCY', subSource: 'POS', ageingLabel: '28 Mins', ageingLevel: 'urgent',
    channelPartner: 'Subhash Kumar', city: 'Koderma', caseTag: 'New', policyTag: 'STP',
    policyNumber: '100083625200', insurerName: 'ICICI Lombard', assignedTo: 'Lalita Bisht',
    proposerName: 'Mahesh Kumar Singh', caseType: 'Booked Verification Call', statusSel: 'Pending', nstpReason: 'N/A',
    medium: 'Offline', policyType: 'New', planType: 'Base Plan', policySubSource: 'POS',
    dealerName: 'Subhash Kumar', proposalNo: 'N/A', businessType: 'Retail', freshDeskId: 'N/A',
    groupPolicyType: 'N/A', medicalType: 'N/A', preRequestId: 'N/A', brokerName: 'GIBPL', localIssuance: 'No', crossSell: 'No',
    insuredMembers: [{ relation: 'self', name: 'Mr. Mahesh Kumar Singh', gender: 'Male', dob: '1983-04-25', occupation: '', height: '5 ft 6 in', weight: '71', annualIncome: '' }],
    quote: mkSimpleQuote('ICICI Lombard', 'Elevate', '13480'),
    transactions: [], paymentReminders: [],
    communication: true, pendingReason: 'Case not picked', pendingWith: '', remarks: '',
    activityLog: mkLighterLog('Booked Verification Call Pending', 'Lalita Bisht'),
  },
];

// ---- Allocation Buckets & Rules (Health) ----

export const AB_MODULES = ['Health Policy List', 'Create Health List', 'All'];
export const AB_PRODUCT_TYPES = ['Base Plan', 'Family Floater', 'Super Topup', 'All'];
export const AR_CASE_TYPE_OPTIONS = ['New', 'Renewal', 'Port Portability', 'All'];
export const AR_SOURCE_OPTIONS = ['POS', 'Online', 'CRM Offline', 'All'];
export const AR_INSURER_OPTIONS = ['ICICI Lombard', 'Star Health', 'Universal Sompo', 'Aditya Birla Health', 'Bajaj Allianz General', 'HDFC ERGO', 'All'];
export const AR_PREMIUM_BUCKET_OPTIONS = ['0–10K', '10K–25K', '25K–50K', '50K–1L', '>1L', 'All'];

export const AR_FIELD_LABELS: Record<ArFieldKey, string> = { caseType: 'Case Type', source: 'Source', insurer: 'Insurer', premiumBucket: 'Premium Bucket' };
export const AR_FIELD_OPTIONS: Record<ArFieldKey, { type: 'select' | 'multiselect' | 'multiselect-search'; options: string[] }> = {
  caseType: { type: 'select', options: AR_CASE_TYPE_OPTIONS },
  source: { type: 'select', options: AR_SOURCE_OPTIONS },
  insurer: { type: 'multiselect-search', options: AR_INSURER_OPTIONS },
  premiumBucket: { type: 'multiselect', options: AR_PREMIUM_BUCKET_OPTIONS },
};

export const AB_ROSTER = ['Lalita Bisht', 'Dheeraj Shukla', 'Shah Nidhi', 'Devmurari Pawel', 'Praphull Kumar'];

export const INIT_AB_BUCKETS: AbBucket[] = [
  {
    id: 'HEALTH_ICICI_G1', name: 'ICICI_Health_Central', desc: 'ICICI Lombard POS new business QC — Central team',
    status: true, createdBy: 'Lalita Bisht', createdAt: '12/7/2026, 3:20 pm', updatedAt: '18/7/2026, 11:38 am',
    users: ['Lalita Bisht', 'Praphull Kumar'],
    log: [
      { text: 'Added user: Praphull Kumar to the bucket', by: 'Lalita Bisht', at: '2026-07-18 11:38:08' },
      { text: 'Updated the status: On', by: 'Lalita Bisht', at: '2026-07-16 09:12:40' },
      { text: 'Created the bucket', by: 'Lalita Bisht', at: '2026-07-12 15:20:10' },
    ],
  },
  {
    id: 'HEALTH_STAR_G1', name: 'StarHealth_Renewal_G1', desc: 'Star Health renewal case QC allocation — Group 1',
    status: true, createdBy: 'Dheeraj Shukla', createdAt: '14/7/2026, 10:05 am', updatedAt: '4/8/2026, 1:51 pm',
    users: ['Dheeraj Shukla', 'Shah Nidhi'],
    log: [
      { text: 'Added user: Shah Nidhi to the bucket', by: 'Dheeraj Shukla', at: '2026-08-04 13:51:56' },
      { text: 'Created the bucket', by: 'Dheeraj Shukla', at: '2026-07-14 10:05:00' },
    ],
  },
  {
    id: 'HEALTH_UNIVSOMPO_CENTRAL', name: 'UnivSompo_QC_Central', desc: 'Universal Sompo offline case QC — Central pool',
    status: false, createdBy: 'Non-ITMS User', createdAt: '15/7/2026, 5:45 pm', updatedAt: '15/7/2026, 5:45 pm',
    users: ['Shah Nidhi'],
    log: [{ text: 'Created the bucket', by: 'Non-ITMS User', at: '2026-07-15 17:45:00' }],
  },
  {
    id: 'HEALTH_ADITYABIRLA_B2B', name: 'AdityaBirla_B2B', desc: 'Aditya Birla Health — B2B channel POS cases',
    status: true, createdBy: 'Lalita Bisht', createdAt: '16/7/2026, 12:15 pm', updatedAt: '6/8/2026, 9:00 am',
    users: ['Praphull Kumar', 'Devmurari Pawel', 'Lalita Bisht'],
    log: [
      { text: 'Added user: Devmurari Pawel to the bucket', by: 'Lalita Bisht', at: '2026-08-06 09:00:00' },
      { text: 'Created the bucket', by: 'Lalita Bisht', at: '2026-07-16 12:15:00' },
    ],
  },
  {
    id: 'HEALTH_BAJAJ_PILOT', name: 'Bajaj_Health_Pilot', desc: 'Bajaj Allianz pilot bucket for family floater plans',
    status: false, createdBy: 'Non-ITMS User', createdAt: '20/7/2026, 2:00 pm', updatedAt: '20/7/2026, 2:00 pm',
    users: ['Praphull Kumar'],
    log: [{ text: 'Created the bucket', by: 'Non-ITMS User', at: '2026-07-20 14:00:00' }],
  },
  {
    id: 'HEALTH_HDFCERGO_INVESTIGATION', name: 'HDFCErgo_Investigation_Central', desc: 'HDFC ERGO — medical investigation QC, central pool',
    status: true, createdBy: 'Dheeraj Shukla', createdAt: '22/7/2026, 4:30 pm', updatedAt: '5/8/2026, 3:10 pm',
    users: ['Praphull Kumar', 'Devmurari Pawel'],
    log: [{ text: 'Created the bucket', by: 'Dheeraj Shukla', at: '2026-07-22 16:30:00' }],
  },
];

export const INIT_AB_RULES: AbRule[] = [
  {
    id: 'RULE_ICICI_NB_POS', name: 'ICICI_NewBiz_POS', module: 'Create Health List', status: true,
    createdAt: '2026-07-19 10:15:00', updatedAt: '2026-07-19 10:20:00', createdBy: 'Lalita Bisht',
    linkedBucket: 'HEALTH_ICICI_G1', maxTickets: 40, productType: 'Base Plan',
    fields: [{ field: 'source', value: 'POS' }, { field: 'insurer', value: ['ICICI Lombard'] }],
    log: [
      { text: 'Updated the status: On', by: 'Lalita Bisht', at: '2026-07-19 10:20:00' },
      { text: 'Added field: Source = POS, Insurer = ICICI Lombard', by: 'Lalita Bisht', at: '2026-07-19 10:16:30' },
      { text: 'Created the rule: module Create Health List, max tickets 40, product type Base Plan', by: 'Lalita Bisht', at: '2026-07-19 10:15:00' },
    ],
  },
  {
    id: 'RULE_STAR_RENEWAL', name: 'StarHealth_Renewal_Central', module: 'Health Policy List', status: true,
    createdAt: '2026-07-20 09:40:00', updatedAt: '2026-07-20 09:45:00', createdBy: 'Dheeraj Shukla',
    linkedBucket: 'HEALTH_STAR_G1', maxTickets: 35, productType: 'Family Floater',
    fields: [{ field: 'caseType', value: 'Renewal' }, { field: 'insurer', value: ['Star Health'] }],
    log: [{ text: 'Created the rule: module Health Policy List, max tickets 35, product type Family Floater', by: 'Dheeraj Shukla', at: '2026-07-20 09:40:00' }],
  },
  {
    id: 'RULE_UNIVSOMPO_HIGHPREM', name: 'UnivSompo_HighPremium_All', module: 'Health Policy List', status: false,
    createdAt: '2026-07-22 14:05:00', updatedAt: '2026-07-22 14:05:00', createdBy: 'Shah Nidhi',
    linkedBucket: 'HEALTH_UNIVSOMPO_CENTRAL', maxTickets: 25, productType: 'All',
    fields: [{ field: 'insurer', value: ['Universal Sompo'] }, { field: 'premiumBucket', value: ['50K–1L', '>1L'] }],
    log: [{ text: 'Created the rule: module Health Policy List, max tickets 25, product type All', by: 'Shah Nidhi', at: '2026-07-22 14:05:00' }],
  },
  {
    id: 'RULE_ADITYABIRLA_B2B_NB', name: 'AdityaBirla_B2B_NewBiz', module: 'Create Health List', status: true,
    createdAt: '2026-07-23 11:20:00', updatedAt: '2026-07-23 11:20:00', createdBy: 'Lalita Bisht',
    linkedBucket: 'HEALTH_ADITYABIRLA_B2B', maxTickets: 50, productType: 'Base Plan',
    fields: [{ field: 'source', value: 'Online' }, { field: 'caseType', value: 'New' }],
    log: [{ text: 'Created the rule: module Create Health List, max tickets 50, product type Base Plan', by: 'Lalita Bisht', at: '2026-07-23 11:20:00' }],
  },
  {
    id: 'RULE_HDFCERGO_ALL', name: 'HDFCErgo_Investigation_All', module: 'Health Policy List', status: true,
    createdAt: '2026-07-25 16:45:00', updatedAt: '2026-07-25 16:45:00', createdBy: 'Dheeraj Shukla',
    linkedBucket: 'HEALTH_HDFCERGO_INVESTIGATION', maxTickets: 30, productType: 'All',
    fields: [{ field: 'insurer', value: ['HDFC ERGO'] }, { field: 'premiumBucket', value: ['10K–25K', '25K–50K'] }],
    log: [{ text: 'Created the rule: module Health Policy List, max tickets 30, product type All', by: 'Dheeraj Shukla', at: '2026-07-25 16:45:00' }],
  },
];

// ---- QC Dashboard (Health) ----

export interface QcTreeNode {
  key: string;
  label: string;
  children?: QcTreeNode[];
}

export const QC_STATUS_TREE: QcTreeNode[] = [
  { key: 'payment', label: 'Payment', children: [
    { key: 'payment_pending', label: 'Pending' },
    { key: 'payment_done_unavailable', label: 'Done_Policy Unavailable' },
    { key: 'payment_done_available', label: 'Done_Policy Available' },
  ] },
  { key: 'welcomecall', label: 'Welcome Call', children: [
    { key: 'wc_pending', label: 'Pending' },
    { key: 'wc_done', label: 'Done' },
  ] },
  { key: 'premedical', label: 'Pre Medical Docs', children: [
    { key: 'pmd_pending', label: 'Pending' },
    { key: 'pmd_received', label: 'Received' },
  ] },
  { key: 'medical', label: 'Medical', children: [
    { key: 'med_pending', label: 'Pending' },
    { key: 'med_scheduled', label: 'Scheduled' },
    { key: 'med_completed', label: 'Completed' },
    { key: 'med_cancelled', label: 'Cancelled' },
    { key: 'med_docpending', label: 'Doc Pending' },
    { key: 'med_docreceived', label: 'Doc Received' },
    { key: 'med_adddocpending', label: 'Add Doc Pending' },
    { key: 'med_adddocreceived', label: 'Add Doc Received' },
  ] },
  { key: 'uwapproval', label: 'UW Approval', children: [
    { key: 'counteroffer', label: 'Counter Offer', children: [
      { key: 'co_accepted', label: 'Accepted' },
      { key: 'co_rejected', label: 'Rejected' },
      { key: 'co_pending', label: 'Pending' },
    ] },
  ] },
  { key: 'refund', label: 'Refund', children: [
    { key: 'refund_pending', label: 'Pending' },
  ] },
  { key: 'proposal', label: 'Proposal' },
];

export const QC_BOOKED_TREE: QcTreeNode[] = [
  { key: 'booked', label: 'Booked', children: [
    { key: 'booked_vcpending', label: 'Verification Call Pending' },
    { key: 'booked_vcdone', label: 'Verification Call Done' },
    { key: 'booked_docpending', label: 'Policy Document Pending' },
    { key: 'booked_excessrefundpending', label: 'Excess Refund Pending' },
    { key: 'booked_excessrefundcompleted', label: 'Excess refund completed' },
    { key: 'booked_provisional', label: 'Provisional' },
  ] },
  { key: 'policycancelled', label: 'Policy Cancelled', children: [
    { key: 'cancelled_na', label: 'N/A' },
  ] },
];

export const QC_ALL_STATUS_LABELS: Record<string, string> = {};
[...QC_STATUS_TREE, ...QC_BOOKED_TREE].forEach(function collect(node: QcTreeNode) {
  QC_ALL_STATUS_LABELS[node.key] = node.label;
  (node.children || []).forEach(collect);
});

const QC_PIPELINE_LEAVES: { key: string; weight: number }[] = [
  { key: 'payment_pending', weight: 3 }, { key: 'payment_done_unavailable', weight: 5 }, { key: 'payment_done_available', weight: 2 },
  { key: 'wc_pending', weight: 6 }, { key: 'wc_done', weight: 2 },
  { key: 'pmd_pending', weight: 1 }, { key: 'pmd_received', weight: 1 },
  { key: 'med_pending', weight: 8 }, { key: 'med_scheduled', weight: 3 }, { key: 'med_completed', weight: 1 }, { key: 'med_cancelled', weight: 1 },
  { key: 'med_docpending', weight: 4 }, { key: 'med_docreceived', weight: 5 }, { key: 'med_adddocpending', weight: 1 }, { key: 'med_adddocreceived', weight: 1 },
  { key: 'co_accepted', weight: 1 }, { key: 'co_rejected', weight: 1 }, { key: 'co_pending', weight: 1 },
  { key: 'refund_pending', weight: 12 },
  { key: 'proposal', weight: 40 },
];

const QC_BOOKED_LEAVES: { key: string; weight: number }[] = [
  { key: 'booked_vcpending', weight: 8 }, { key: 'booked_vcdone', weight: 70 }, { key: 'booked_docpending', weight: 1 },
  { key: 'booked_excessrefundpending', weight: 1 }, { key: 'booked_excessrefundcompleted', weight: 1 }, { key: 'booked_provisional', weight: 1 },
  { key: 'cancelled_na', weight: 8 },
];

export const QC_TEAM_LEADS = ['Meenakshi Rao', 'Sandeep Kulkarni'];
export const QC_ALL_PEOPLE = [...AB_ROSTER, ...QC_TEAM_LEADS];
export const QC_HIERARCHY: Record<string, string[]> = {
  'Meenakshi Rao': ['Lalita Bisht', 'Praphull Kumar'],
  'Sandeep Kulkarni': ['Dheeraj Shukla', 'Shah Nidhi'],
};
// Devmurari Pawel starts unmapped, to demo hierarchy management.

const QC_CUST_FIRST = ['Ashwani', 'Ashish', 'Rajinder', 'Priyanka', 'Suresh', 'Manoj', 'Kavita', 'Deepak', 'Ritu', 'Vikas', 'Sunita', 'Anil', 'Pooja', 'Naveen', 'Meena', 'Rakesh', 'Seema', 'Amit', 'Nisha', 'Vivek'];
const QC_CUST_LAST = ['Kumar', 'Sharma', 'Chauhan', 'Singh', 'Verma', 'Gupta', 'Yadav', 'Mishra', 'Tiwari', 'Prakash', 'Agarwal', 'Malhotra', 'Kapoor', 'Joshi', 'Nair'];

function qcRandInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function qcChoice<T>(arr: T[]): T { return arr[qcRandInt(0, arr.length - 1)]; }
function qcWeightedPick(items: { key: string; weight: number }[]): string {
  const total = items.reduce((a, i) => a + i.weight, 0);
  let r = Math.random() * total;
  for (const it of items) { r -= it.weight; if (r <= 0) return it.key; }
  return items[items.length - 1].key;
}
function qcRandomTatDays(): number {
  const r = Math.random();
  if (r < 0.4) return qcRandInt(0, 3);
  if (r < 0.6) return qcRandInt(4, 5);
  if (r < 0.8) return qcRandInt(6, 10);
  return qcRandInt(11, 29);
}
function qcDaysAgoIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(qcRandInt(9, 18), qcRandInt(0, 59), 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

let qcSeq = 500001;
function genQcCases(leaves: { key: string; weight: number }[], count: number): QcCase[] {
  const out: QcCase[] = [];
  for (let i = 0; i < count; i++) {
    const tatDays = qcRandomTatDays();
    out.push({
      id: 'QC-' + (qcSeq++),
      leadId: 'LD' + qcRandInt(10000, 99999),
      requestId: 'RQ' + qcRandInt(100000, 999999),
      executive: qcChoice(AB_ROSTER),
      requestDT: qcDaysAgoIso(tatDays),
      statusKey: qcWeightedPick(leaves),
      insurer: qcChoice(SR_INSURERS),
      caseType: qcChoice(['New', 'Renewal', 'Port Portability']),
      source: qcChoice(SR_SOURCES),
      productType: qcChoice(['Base Plan', 'Family Floater', 'Super Topup']),
      customerName: `${qcChoice(QC_CUST_FIRST)} ${qcChoice(QC_CUST_LAST)}`,
      tatDays,
      premium: qcRandInt(8, 45) * 1000,
    });
  }
  return out;
}

export const QC_CASES: QcCase[] = [...genQcCases(QC_PIPELINE_LEAVES, 90), ...genQcCases(QC_BOOKED_LEAVES, 110)];

export function qcTatBucket(days: number): 'breached' | 'b0_3' | 'b4_5' | 'b6_10' {
  if (days > 10) return 'breached';
  if (days >= 6) return 'b6_10';
  if (days >= 4) return 'b4_5';
  return 'b0_3';
}

