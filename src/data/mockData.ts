import type { AppUser, AppRole, IpApprover, IpUserRequest, IpLogin, WfData } from '../types';

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
  { section: 'User Management', items: ['Users', 'Roles', 'User Attendance', 'Working Hour Config'] },
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

export const IP_INSURERS = ['United India Insurance Company Limited', 'HDFC Ergo', 'Digit General Insurance', 'Reliance General'];
export const IP_STATUSES = ['Approval Pending - ZH', 'Approval Pending - Admin', 'Rejected - ZH', 'Rejected - Admin', 'Closed'];
export const IP_REJECT_REASONS = ['Invalid Request', 'Insurer not serviceable', 'Duplicate Request', 'Others'];
