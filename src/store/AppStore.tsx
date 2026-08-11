import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import type {
  AppUser, AppRole, ToastState, PageKey, IpApprover, IpUserRequest, CuRequest, CuConfig, CuStatus, SrRequest, SrFilters,
  ChrFormState, ChrInsuredMember, AbBucket, AbFilters, AbRule, ArFilters, ArField, ArFieldKey, QcPersona, QcPeriod, QcTab, QcFilters, QcDrilldown,
} from '../types';
import {
  INIT_USERS, INIT_ROLES, INIT_IP_APPROVERS, INIT_IP_USERS, WF, INIT_USER_REQUESTS, CU_PERM_KEY, INIT_SR_REQUESTS,
  CHR_DEALER_LOOKUP, CHR_PLAN_TYPE_LOOKUP, INIT_AB_BUCKETS, INIT_AB_RULES, AB_ROSTER, QC_HIERARCHY,
} from '../data/mockData';

export type UmSubView = 'list' | 'form';
export type RmSubView = 'list' | 'form';
export type IpTab = 'approver' | 'users' | 'logins';

export interface UmFormState {
  type: string;
  name: string;
  email: string;
  role: string;
  mobile: string;
}

export interface RmFormState {
  name: string;
  ticket: string;
  product: string;
}

export interface CuFormState {
  empCode: string;
  email: string;
  mobile: string;
  roleMode: 'role' | 'equivalent';
  role: string;
  equivalentEmail: string;
  remark: string;
}

export interface AppState {
  view: 'login' | 'app';
  loggingIn: string | false;
  page: PageKey;
  toast: ToastState | null;
  profileOpen: boolean;
  sidebarCollapsed: boolean;
  umrExpanded: boolean;
  lastLoginTime: string;
  sessionVia: string;
  todayDate: string;

  umUsers: AppUser[];
  umSearch: string;
  umStatus: string;
  umType: string;
  umPage: number;
  umPerPage: number;
  umSubView: UmSubView;
  umEditId: number | null;
  umForm: UmFormState;
  umDeleteId: number | null;
  umDeleteOpen: boolean;
  umPermsOpen: boolean;
  umPermsUserId: number | null;
  umPermsChecked: boolean[];
  umAllocOpen: boolean;
  umAllocUserId: number | null;
  umLogOpen: boolean;
  umLogUserId: number | null;

  rmRoles: AppRole[];
  rmSearch: string;
  rmStatus: string;
  rmPage: number;
  rmPerPage: number;
  rmSubView: RmSubView;
  rmEditId: number | null;
  rmForm: RmFormState;
  rmPermsOpen: boolean;
  rmPermsRoleId: number | null;
  rmPermsChecked: Record<string, boolean>;
  rmUsersOpen: boolean;
  rmUserRoleId: number | null;
  rmUserTab: 'active' | 'inactive';
  rmLogOpen: boolean;
  rmLogRoleId: number | null;

  wfV: string | null;
  wfP: string | null;
  wfSub: string | null;
  wfSel: string[];
  wfActiveTab: string | null;
  wfOvr: Record<string, string[]>;

  ipTab: IpTab;
  ipApprovers: IpApprover[];
  ipUsers: IpUserRequest[];
  ipFilters: { reqid: string; insurer: string; gcd: string; status: string };
  ipDetailId: string | null;
  ipRejOpen: boolean;
  ipRejReason: string;
  ipUploadOpen: boolean;

  cuPersona: 'L1' | 'L2';
  cuPermission: boolean;
  cuRequests: CuRequest[];
  cuSearch: string;
  cuStatus: string;
  cuSubView: 'list' | 'form' | 'review';
  cuForm: CuFormState;
  cuActiveId: string | null;
  cuConfig: CuConfig;
  cuLogOpen: boolean;
  cuLogId: string | null;
  cuRejectOpen: boolean;
  cuRejectReason: string;
  cuEmailOpen: boolean;
  cuEmailId: string | null;

  srSubView: 'list' | 'details';
  srActiveId: string | null;
  srRequests: SrRequest[];
  srFilters: SrFilters;
  srMoreFiltersOpen: boolean;
  srRemarksDraft: string;
  srActivityFilter: string;
  srDirty: boolean;

  hrExpanded: boolean;
  chrForm: ChrFormState;

  abBuckets: AbBucket[];
  abFilters: AbFilters;
  abModalOpen: boolean;
  abEditId: string | null;
  abNameDraft: string;
  abDescDraft: string;
  abUsersDraft: string[];
  abUserSearch: string;
  abLogOpen: boolean;
  abLogId: string | null;

  arRules: AbRule[];
  arFilters: ArFilters;
  arModalOpen: boolean;
  arEditId: string | null;
  arNameDraft: string;
  arModuleDraft: string;
  arMaxTicketsDraft: string;
  arProductTypeDraft: string;
  arFieldsDraft: ArField[];
  arLogOpen: boolean;
  arLogId: string | null;

  qcPersona: QcPersona;
  qcExecViewer: string;
  qcTlViewer: string;
  qcTab: QcTab;
  qcPeriod: QcPeriod;
  qcCustomStart: string;
  qcCustomEnd: string;
  qcFilters: QcFilters;
  qcCollapsedRows: string[];
  qcHierarchy: Record<string, string[]>;
  qcHierSelectedTl: string;
  qcDrilldown: QcDrilldown | null;
}

const emptyCuForm: CuFormState = { empCode: '', email: '', mobile: '', roleMode: 'role', role: '', equivalentEmail: '', remark: '' };
const emptyCuConfig: CuConfig = { name: '', userType: 'ITMS', role: '', region: '', teamOnly: false, autoLogout: false };

const emptyChrForm: ChrFormState = {
  policyMode: 'retail',
  brokerName: '', caseType: '', retailType: 'RMC', policyType: '', policyDocAvailable: '', policyDocFileName: '',
  insurerName: '', adults: '', children: '',
  previousPolicyNumber: '', firstInceptionDate: '', gibplPreviousPolicy: '', medicalRequired: '',
  dealerCode: '', fusionLead: '', localIssuance: '', crossSell: '',
  proposerFirstName: '', proposerLastName: '', proposerDob: '', gender: '', email: '', mobile: '', address: '', pincode: '', area: '',
  proposerSameAsInsurer: false, insuredMembers: [],
  planName: '', policyTenure: '', sumInsured: '', paymentMode: '', paymentDate: '', proposalNumber: '',
  chequeNumber: '', chequeBank: '', chequeCopyFileName: '', chequeAckFileName: '', chequeAmount: '', chequeDate: '',
  emiYesNo: '', paymentFrequency: '', ecsType: '',
  totalPremium: '',
};

const emptyAbFilters: AbFilters = { name: '', status: 'all', createdBy: '', createdDate: '', updatedDate: '' };
const emptyArFilters: ArFilters = { name: '', module: 'all', status: 'all', createdFrom: '', createdTo: '', updatedFrom: '', updatedTo: '', createdBy: '', linkBucket: 'all' };
const emptyQcFilters: QcFilters = { dateFrom: '', dateTo: '', caseType: '', premiumOrNop: 'nop', productType: '', source: '', executive: '', insurer: '' };

function emptyChrMember(memberType: ChrInsuredMember['memberType']): ChrInsuredMember {
  return { memberType, firstName: '', lastName: '', dob: '', gender: '', relationship: '', pedDetails: [] };
}

function chrResizeMembers(members: ChrInsuredMember[], adults: string, children: string): ChrInsuredMember[] {
  const numAdults = Number(adults || '0');
  const numChildren = Number(children || '0');
  const total = numAdults + numChildren;
  const next: ChrInsuredMember[] = [];
  for (let i = 0; i < total; i++) {
    const memberType: ChrInsuredMember['memberType'] = i < numAdults ? 'Adult' : 'Child';
    next.push(members[i] ? { ...members[i], memberType } : emptyChrMember(memberType));
  }
  return next;
}

export function chrEffectiveMembers(f: ChrFormState): ChrInsuredMember[] {
  return f.insuredMembers.map((m, i) => {
    if (i === 0 && f.proposerSameAsInsurer) {
      return { ...m, firstName: f.proposerFirstName, lastName: f.proposerLastName, dob: f.proposerDob, gender: f.gender, relationship: 'Self' };
    }
    return m;
  });
}

export function chrIsValid(f: ChrFormState): boolean {
  if (!f.brokerName || !f.caseType || !f.policyType || !f.policyDocAvailable || !f.insurerName) return false;
  if (!f.adults || !f.dealerCode || !f.fusionLead || !f.localIssuance || !f.crossSell) return false;
  if (!f.proposerFirstName.trim() || !f.gender || !f.email.trim() || !f.mobile.trim() || !f.address.trim() || !f.pincode.trim() || !f.area) return false;
  if (!f.planName || !f.policyTenure || !f.sumInsured || !f.paymentMode || !f.proposalNumber.trim() || !f.totalPremium.trim() || !f.emiYesNo) return false;

  if (f.caseType === 'Renewal' && !f.previousPolicyNumber.trim()) return false;
  if (f.caseType === 'Port Fresh' || f.caseType === 'Port Renewal') {
    if (!f.previousPolicyNumber.trim() || !f.firstInceptionDate || !f.gibplPreviousPolicy || !f.medicalRequired) return false;
  }
  if (f.policyDocAvailable === 'Yes' && !f.policyDocFileName) return false;
  if (f.paymentMode === 'Cheque') {
    if (!f.chequeNumber.trim() || !f.chequeBank || !f.chequeCopyFileName || !f.chequeAmount.trim()) return false;
  }
  if (f.emiYesNo === 'Yes') {
    if (!f.paymentFrequency || !f.ecsType) return false;
  }
  if (f.insuredMembers.length === 0) return false;
  const effective = chrEffectiveMembers(f);
  for (const m of effective) {
    if (!m.firstName.trim() || !m.dob || !m.gender || !m.relationship) return false;
  }
  return true;
}

function stamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const initialState: AppState = {
  view: 'login',
  loggingIn: false,
  page: 'home',
  toast: null,
  profileOpen: false,
  sidebarCollapsed: false,
  umrExpanded: true,
  lastLoginTime: '—', sessionVia: '—', todayDate: '—',

  umUsers: INIT_USERS,
  umSearch: '', umStatus: '', umType: '',
  umPage: 1, umPerPage: 7,
  umSubView: 'list', umEditId: null,
  umForm: { type: 'ITMS', name: '', email: '', role: '', mobile: '' },
  umDeleteId: null, umDeleteOpen: false,
  umPermsOpen: false, umPermsUserId: null, umPermsChecked: [],
  umAllocOpen: false, umAllocUserId: null,
  umLogOpen: false, umLogUserId: null,

  rmRoles: INIT_ROLES,
  rmSearch: '', rmStatus: '', rmPage: 1, rmPerPage: 7,
  rmSubView: 'list', rmEditId: null,
  rmForm: { name: '', ticket: '', product: '' },
  rmPermsOpen: false, rmPermsRoleId: null, rmPermsChecked: {},
  rmUsersOpen: false, rmUserRoleId: null, rmUserTab: 'active',
  rmLogOpen: false, rmLogRoleId: null,

  wfV: null, wfP: null, wfSub: null, wfSel: [], wfActiveTab: null, wfOvr: {},

  ipTab: 'approver',
  ipApprovers: INIT_IP_APPROVERS,
  ipUsers: INIT_IP_USERS,
  ipFilters: { reqid: '', insurer: '', gcd: '', status: '' },
  ipDetailId: null, ipRejOpen: false, ipRejReason: '',
  ipUploadOpen: false,

  cuPersona: 'L1',
  cuPermission: true,
  cuRequests: INIT_USER_REQUESTS,
  cuSearch: '', cuStatus: '',
  cuSubView: 'list',
  cuForm: emptyCuForm,
  cuActiveId: null,
  cuConfig: emptyCuConfig,
  cuLogOpen: false, cuLogId: null,
  cuRejectOpen: false, cuRejectReason: '',
  cuEmailOpen: false, cuEmailId: null,

  srSubView: 'list',
  srActiveId: null,
  srRequests: INIT_SR_REQUESTS,
  srFilters: {
    reqId: '', policyNumber: '', proposalNumber: '', customerName: '', mobile: '', email: '',
    caseType: '', insurer: '', medium: '', status: '', policyType: '', businessType: '',
    source: '', paymentMode: '', paymentMethod: '', myTickets: false,
  },
  srMoreFiltersOpen: false,
  srRemarksDraft: '',
  srActivityFilter: 'All',
  srDirty: false,

  hrExpanded: true,
  chrForm: emptyChrForm,

  abBuckets: INIT_AB_BUCKETS,
  abFilters: emptyAbFilters,
  abModalOpen: false, abEditId: null, abNameDraft: '', abDescDraft: '', abUsersDraft: [], abUserSearch: '',
  abLogOpen: false, abLogId: null,

  arRules: INIT_AB_RULES,
  arFilters: emptyArFilters,
  arModalOpen: false, arEditId: null, arNameDraft: '', arModuleDraft: '', arMaxTicketsDraft: '', arProductTypeDraft: '',
  arFieldsDraft: [],
  arLogOpen: false, arLogId: null,

  qcPersona: 'executive',
  qcExecViewer: AB_ROSTER[0],
  qcTlViewer: Object.keys(QC_HIERARCHY)[0],
  qcTab: 'dashboard',
  qcPeriod: 'month',
  qcCustomStart: '', qcCustomEnd: '',
  qcFilters: emptyQcFilters,
  qcCollapsedRows: [],
  qcHierarchy: QC_HIERARCHY,
  qcHierSelectedTl: Object.keys(QC_HIERARCHY)[0],
  qcDrilldown: null,
};

type Updater = Partial<AppState> | ((s: AppState) => Partial<AppState>);

function useAppStoreValue() {
  const [state, setState] = useState<AppState>(initialState);
  const toastTimer = useRef<number | undefined>(undefined);

  const update = useCallback((patch: Updater) => {
    setState(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  }, []);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success', durationMs: number = 3400) => {
    window.clearTimeout(toastTimer.current);
    update({ toast: { msg, type } });
    toastTimer.current = window.setTimeout(() => update({ toast: null }), durationMs);
  }, [update]);

  // ---- auth / nav ----
  const onLoginClick = useCallback((provider: string) => {
    update({ loggingIn: provider });
    window.setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      update({ view: 'app', loggingIn: false, lastLoginTime: `${timeStr} today`, sessionVia: provider, todayDate: dateStr });
      window.setTimeout(() => showToast(`Welcome back, Jijo! Signed in via ${provider} ✓`), 300);
    }, 1200);
  }, [update, showToast]);

  const onNavTo = useCallback((page: PageKey) => update({ page, profileOpen: false }), [update]);

  const onLogout = useCallback(() => {
    update({ view: 'login', page: 'home', profileOpen: false });
    window.setTimeout(() => showToast('Logged out successfully'), 200);
  }, [update, showToast]);

  const onToggleProfile = useCallback(() => update(s => ({ profileOpen: !s.profileOpen })), [update]);
  const onToggleSidebar = useCallback(() => update(s => ({ sidebarCollapsed: !s.sidebarCollapsed })), [update]);
  const onToggleUmr = useCallback(() => update(s => ({ umrExpanded: !s.umrExpanded })), [update]);
  const onToggleHr = useCallback(() => update(s => ({ hrExpanded: !s.hrExpanded })), [update]);
  const onProfileItem = useCallback((msg: string) => { update({ profileOpen: false }); showToast(msg); }, [update, showToast]);
  const onSettingsClick = useCallback(() => showToast('Settings coming soon'), [showToast]);

  // ---- user management ----
  const umFilteredUsers = useCallback((s: AppState = state) => {
    const q = s.umSearch.toLowerCase();
    return s.umUsers.filter(u => {
      const mq = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || u.mobile.includes(q);
      const ms = !s.umStatus || (s.umStatus === 'active' ? u.active : !u.active);
      const mt = !s.umType || u.type === s.umType;
      return mq && ms && mt;
    });
  }, [state]);

  const onUmAddUser = useCallback(() => update({ umSubView: 'form', umEditId: null, umForm: { type: 'ITMS', name: '', email: '', role: '', mobile: '' } }), [update]);
  const onUmOpenEdit = useCallback((id: number) => {
    setState(s => {
      const u = s.umUsers.find(x => x.id === id);
      if (!u) return s;
      return { ...s, umSubView: 'form', umEditId: id, umForm: { type: u.type, name: u.name, email: u.email, role: u.role, mobile: u.mobile } };
    });
  }, []);
  const onUmBackToList = useCallback(() => update({ umSubView: 'list', umEditId: null }), [update]);
  const onUmFormField = useCallback((field: keyof UmFormState, value: string) => update(s => ({ umForm: { ...s.umForm, [field]: value } })), [update]);
  const onUmSaveUser = useCallback(() => {
    setState(s => {
      const f = s.umForm;
      if (!f.name.trim() || !f.email.trim() || !f.role) {
        showToast('Please fill in all required fields', 'error');
        return s;
      }
      let umUsers = s.umUsers;
      if (s.umEditId) {
        umUsers = s.umUsers.map(u => u.id === s.umEditId ? { ...u, name: f.name, email: f.email, role: f.role as AppUser['role'], mobile: f.mobile || u.mobile } : u);
        showToast(`User "${f.name}" updated successfully`);
      } else {
        const newUser: AppUser = { id: Date.now(), name: f.name, email: f.email, role: f.role as AppUser['role'], mobile: f.mobile || '—', type: f.type as AppUser['type'], added: new Date().toISOString().split('T')[0], active: true };
        umUsers = [newUser, ...s.umUsers];
        showToast(`User "${f.name}" added successfully`);
      }
      return { ...s, umUsers, umSubView: 'list', umEditId: null, umPage: 1 };
    });
  }, [showToast]);
  const onUmToggleStatus = useCallback((id: number) => {
    setState(s => {
      const u = s.umUsers.find(x => x.id === id);
      const umUsers = s.umUsers.map(x => x.id === id ? { ...x, active: !x.active } : x);
      if (u) window.setTimeout(() => showToast(`${u.name} ${!u.active ? 'activated' : 'deactivated'}`), 0);
      return { ...s, umUsers };
    });
  }, [showToast]);
  const onUmOpenDelete = useCallback((id: number) => update({ umDeleteId: id, umDeleteOpen: true }), [update]);
  const onUmCancelDelete = useCallback(() => update({ umDeleteOpen: false, umDeleteId: null }), [update]);
  const onUmConfirmDelete = useCallback(() => {
    setState(s => {
      const u = s.umUsers.find(x => x.id === s.umDeleteId);
      if (u) window.setTimeout(() => showToast(`${u.name} deleted`), 0);
      return { ...s, umUsers: s.umUsers.filter(x => x.id !== s.umDeleteId), umDeleteOpen: false, umDeleteId: null };
    });
  }, [showToast]);
  const onUmOpenPerms = useCallback((id: number, permsListLen: number) => update({ umPermsOpen: true, umPermsUserId: id, umPermsChecked: Array.from({ length: permsListLen }, (_, i) => i % 4 === 0) }), [update]);
  const onUmClosePerms = useCallback(() => update({ umPermsOpen: false }), [update]);
  const onUmTogglePerm = useCallback((i: number) => update(s => { const c = [...s.umPermsChecked]; c[i] = !c[i]; return { umPermsChecked: c }; }), [update]);
  const onUmSavePerms = useCallback(() => { update({ umPermsOpen: false }); showToast('Permissions saved!'); }, [update, showToast]);
  const onUmOpenAlloc = useCallback((id: number) => update({ umAllocOpen: true, umAllocUserId: id }), [update]);
  const onUmCloseAlloc = useCallback(() => update({ umAllocOpen: false }), [update]);
  const onUmSaveAlloc = useCallback(() => { update({ umAllocOpen: false }); showToast('Allocation saved!'); }, [update, showToast]);
  const onUmOpenLog = useCallback((id: number) => update({ umLogOpen: true, umLogUserId: id }), [update]);
  const onUmCloseLog = useCallback(() => update({ umLogOpen: false }), [update]);
  const onUmChangePage = useCallback((d: number) => {
    setState(s => {
      const total = umFilteredUsers(s).length;
      const pages = Math.max(1, Math.ceil(total / s.umPerPage));
      return { ...s, umPage: Math.max(1, Math.min(pages, s.umPage + d)) };
    });
  }, [umFilteredUsers]);
  const onUmGoPage = useCallback((p: number) => update({ umPage: p }), [update]);

  // ---- role management ----
  const rmFilteredRoles = useCallback((s: AppState = state) => {
    const q = s.rmSearch.toLowerCase();
    return s.rmRoles.filter(r => {
      const mq = !q || r.name.toLowerCase().includes(q) || r.ticket.toLowerCase().includes(q) || r.product.toLowerCase().includes(q) || r.addedBy.toLowerCase().includes(q);
      const ms = !s.rmStatus || (s.rmStatus === 'active' ? r.active : !r.active);
      return mq && ms;
    });
  }, [state]);

  const onRmAddRole = useCallback(() => update({ rmSubView: 'form', rmEditId: null, rmForm: { name: '', ticket: '', product: '' } }), [update]);
  const onRmOpenEdit = useCallback((id: number) => {
    setState(s => {
      const r = s.rmRoles.find(x => x.id === id);
      if (!r) return s;
      return { ...s, rmSubView: 'form', rmEditId: id, rmForm: { name: r.name, ticket: r.ticket, product: r.product } };
    });
  }, []);
  const onRmBackToList = useCallback(() => update({ rmSubView: 'list', rmEditId: null }), [update]);
  const onRmFormField = useCallback((field: keyof RmFormState, value: string) => update(s => ({ rmForm: { ...s.rmForm, [field]: value } })), [update]);
  const onRmSaveRole = useCallback(() => {
    setState(s => {
      const f = s.rmForm;
      if (!f.name.trim() || !f.ticket) {
        showToast('Please fill in all required fields', 'error');
        return s;
      }
      let rmRoles = s.rmRoles;
      if (s.rmEditId) {
        rmRoles = s.rmRoles.map(r => r.id === s.rmEditId ? { ...r, name: f.name, ticket: f.ticket, product: f.product || r.product } : r);
        showToast(`Role "${f.name}" updated`);
      } else {
        const newRole: AppRole = { id: Date.now(), name: f.name, product: f.product || 'Insurance', ticket: f.ticket, addedBy: 'Jijo John', added: new Date().toISOString().split('T')[0], active: true, autoLogout: false };
        rmRoles = [newRole, ...s.rmRoles];
        showToast(`Role "${f.name}" created`);
      }
      return { ...s, rmRoles, rmSubView: 'list', rmEditId: null, rmPage: 1 };
    });
  }, [showToast]);
  const onRmToggleStatus = useCallback((id: number) => {
    setState(s => {
      const r = s.rmRoles.find(x => x.id === id);
      const rmRoles = s.rmRoles.map(x => x.id === id ? { ...x, active: !x.active } : x);
      if (r) window.setTimeout(() => showToast(`"${r.name}" ${!r.active ? 'activated' : 'deactivated'}`), 0);
      return { ...s, rmRoles };
    });
  }, [showToast]);
  const onRmToggleAuto = useCallback((id: number) => update(s => ({ rmRoles: s.rmRoles.map(r => r.id === id ? { ...r, autoLogout: !r.autoLogout } : r) })), [update]);
  const onRmChangePage = useCallback((d: number) => {
    setState(s => {
      const total = rmFilteredRoles(s).length;
      const pages = Math.max(1, Math.ceil(total / s.rmPerPage));
      return { ...s, rmPage: Math.max(1, Math.min(pages, s.rmPage + d)) };
    });
  }, [rmFilteredRoles]);
  const onRmGoPage = useCallback((p: number) => update({ rmPage: p }), [update]);
  const onRmOpenPerms = useCallback((id: number) => update(s => ({ rmPermsOpen: true, rmPermsRoleId: id, rmPermsChecked: { [CU_PERM_KEY]: s.cuPermission } })), [update]);
  const onRmClosePerms = useCallback(() => update({ rmPermsOpen: false }), [update]);
  const onRmTogglePermItem = useCallback((key: string) => update(s => ({ rmPermsChecked: { ...s.rmPermsChecked, [key]: !s.rmPermsChecked[key] } })), [update]);
  const onRmSavePerms = useCallback(() => {
    setState(s => {
      const granted = s.rmPermsChecked[CU_PERM_KEY] !== undefined ? s.rmPermsChecked[CU_PERM_KEY] : true;
      const changed = granted !== s.cuPermission;
      window.setTimeout(() => {
        showToast('Permissions saved successfully!');
        if (changed) window.setTimeout(() => showToast(`"Create ITMS User" ${granted ? 'enabled' : 'hidden'} for this role`), 900);
      }, 0);
      return { ...s, rmPermsOpen: false, cuPermission: granted, page: !granted && s.page === 'createuser' ? 'roles' : s.page };
    });
  }, [showToast]);
  const onRmOpenUsers = useCallback((id: number) => update({ rmUsersOpen: true, rmUserRoleId: id, rmUserTab: 'active' }), [update]);
  const onRmCloseUsers = useCallback(() => update({ rmUsersOpen: false }), [update]);
  const onRmOpenLog = useCallback((id: number) => update({ rmLogOpen: true, rmLogRoleId: id }), [update]);
  const onRmCloseLog = useCallback(() => update({ rmLogOpen: false }), [update]);

  // ---- workflow ----
  const wfOvrFor = useCallback((v: string, p: string, st: string, s: AppState = state) => {
    const key = `${v}|${p}|${st}`;
    if (s.wfOvr[key]) return s.wfOvr[key];
    return WF[v][p].transitions[st] || [];
  }, [state]);

  const onWfResetVertical = useCallback(() => update({ wfV: null, wfP: null, wfSub: null, wfSel: [], wfActiveTab: null }), [update]);
  const onWfResetProduct = useCallback(() => update(s => s.wfV ? { wfSub: null, wfSel: [], wfActiveTab: null } : {}), [update]);
  const onWfPickV = useCallback((v: string) => update({ wfV: v, wfP: null, wfSub: null, wfSel: [], wfActiveTab: null }), [update]);
  const onWfPickP = useCallback((p: string) => update({ wfP: p, wfSub: null, wfSel: [], wfActiveTab: null }), [update]);
  const onWfPickSub = useCallback((sp: string) => update({ wfSub: sp, wfSel: [], wfActiveTab: null }), [update]);
  const onWfToggleSt = useCallback((st: string) => {
    update(s => {
      const has = s.wfSel.includes(st);
      const wfSel = has ? s.wfSel.filter(x => x !== st) : [...s.wfSel, st];
      let wfActiveTab = s.wfActiveTab;
      if (wfSel.length && (!wfActiveTab || !wfSel.includes(wfActiveTab))) wfActiveTab = wfSel[0];
      if (!wfSel.length) wfActiveTab = null;
      return { wfSel, wfActiveTab };
    });
  }, [update]);
  const onWfToggleAll = useCallback(() => {
    update(s => {
      const pData = WF[s.wfV!][s.wfP!];
      const allOn = s.wfSel.length === pData.statuses.length;
      const wfSel = allOn ? [] : [...pData.statuses];
      return { wfSel, wfActiveTab: wfSel.length ? wfSel[0] : null };
    });
  }, [update]);
  const onWfSetActiveTab = useCallback((st: string) => update({ wfActiveTab: st }), [update]);
  const onWfToggleTransition = useCallback((other: string) => {
    update(s => {
      const { wfV, wfP, wfActiveTab } = s;
      const key = `${wfV}|${wfP}|${wfActiveTab}`;
      const cur = wfOvrFor(wfV!, wfP!, wfActiveTab!, s);
      const has = cur.includes(other);
      const next = has ? cur.filter(x => x !== other) : [...cur, other];
      return { wfOvr: { ...s.wfOvr, [key]: next } };
    });
  }, [update, wfOvrFor]);
  const onWfCheckAll = useCallback(() => {
    update(s => {
      const { wfV, wfP, wfActiveTab } = s;
      if (!wfActiveTab) return {};
      const pData = WF[wfV!][wfP!];
      const key = `${wfV}|${wfP}|${wfActiveTab}`;
      return { wfOvr: { ...s.wfOvr, [key]: pData.statuses.filter(x => x !== wfActiveTab) } };
    });
  }, [update]);
  const onWfClearAll = useCallback(() => {
    update(s => {
      const { wfV, wfP, wfActiveTab } = s;
      if (!wfActiveTab) return {};
      const key = `${wfV}|${wfP}|${wfActiveTab}`;
      return { wfOvr: { ...s.wfOvr, [key]: [] } };
    });
  }, [update]);
  const onWfSave = useCallback(() => {
    setState(s => {
      showToast(`Workflow saved for ${s.wfSel.length} status${s.wfSel.length !== 1 ? 'es' : ''}`);
      return s;
    });
  }, [showToast]);

  // ---- insurer portal ----
  const ipFilteredUsers = useCallback((s: AppState = state) => {
    const f = s.ipFilters;
    return s.ipUsers.filter(u => {
      const mq = !f.reqid || u.id.includes(f.reqid) || u.opBy.toLowerCase().includes(f.reqid.toLowerCase());
      const mi = !f.insurer || u.insurer === f.insurer;
      const mg = !f.gcd || u.gcd.toLowerCase().includes(f.gcd.toLowerCase());
      const ms = !f.status || u.status === f.status;
      return mq && mi && mg && ms;
    });
  }, [state]);

  const onIpFilterField = useCallback((field: keyof AppState['ipFilters'], value: string) => update(s => ({ ipFilters: { ...s.ipFilters, [field]: value } })), [update]);
  const onIpFilterUsers = useCallback(() => {
    setState(s => {
      showToast(`Showing ${ipFilteredUsers(s).length} records`);
      return s;
    });
  }, [showToast, ipFilteredUsers]);
  const onIpResetFilters = useCallback(() => update({ ipFilters: { reqid: '', insurer: '', gcd: '', status: '' } }), [update]);
  const onIpApproverChange = useCallback((i: number, value: string) => update(s => { const a = [...s.ipApprovers]; a[i] = { ...a[i], value }; return { ipApprovers: a }; }), [update]);
  const onIpApproverAdd = useCallback((i: number) => update(s => { const a = [...s.ipApprovers]; a.splice(i + 1, 0, { label: `Approver ${a.length + 1}`, value: '' }); return { ipApprovers: a }; }), [update]);
  const onIpApproverRemove = useCallback((i: number) => update(s => { if (s.ipApprovers.length <= 1) return {}; const a = [...s.ipApprovers]; a.splice(i, 1); return { ipApprovers: a }; }), [update]);
  const onIpSaveApprovers = useCallback(() => showToast('Approver configuration saved!'), [showToast]);
  const onIpOpenDetail = useCallback((id: string) => update({ ipDetailId: id }), [update]);
  const onIpCloseDetail = useCallback(() => update({ ipDetailId: null }), [update]);
  const onIpApprove = useCallback(() => {
    setState(s => {
      const id = s.ipDetailId;
      const ipUsers = s.ipUsers.map(u => {
        if (u.id !== id) return u;
        if (u.status === 'Approval Pending - ZH') return { ...u, status: 'Approval Pending - Admin' };
        if (u.status === 'Approval Pending - Admin') return { ...u, status: 'Closed' };
        return u;
      });
      window.setTimeout(() => showToast(`Request #${id} approved`), 0);
      return { ...s, ipUsers, ipDetailId: null };
    });
  }, [showToast]);
  const onIpOpenRej = useCallback(() => update({ ipRejOpen: true }), [update]);
  const onIpCloseRej = useCallback(() => update({ ipRejOpen: false }), [update]);
  const onIpConfirmReject = useCallback(() => {
    setState(s => {
      if (!s.ipRejReason) {
        showToast('Please select a rejection reason', 'error');
        return s;
      }
      const id = s.ipDetailId;
      const ipUsers = s.ipUsers.map(u => u.id === id ? { ...u, status: 'Rejected - Admin' } : u);
      window.setTimeout(() => showToast('Request rejected — status updated'), 0);
      return { ...s, ipUsers, ipRejOpen: false, ipDetailId: null, ipRejReason: '' };
    });
  }, [showToast]);
  const onIpOpenUpload = useCallback(() => update({ ipUploadOpen: true }), [update]);
  const onIpCloseUpload = useCallback(() => update({ ipUploadOpen: false }), [update]);
  const onIpConfirmUpload = useCallback(() => { update({ ipUploadOpen: false }); showToast('Login credentials uploaded successfully!'); }, [update, showToast]);
  const setIpTab = useCallback((tab: IpTab) => update({ ipTab: tab }), [update]);

  // ---- create ITMS user (L1 raises request -> L2 configures and creates) ----
  const cuFilteredRequests = useCallback((s: AppState = state) => {
    const q = s.cuSearch.toLowerCase();
    return s.cuRequests.filter(r => {
      const mq = !q || r.id.toLowerCase().includes(q) || r.empCode.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.raisedBy.toLowerCase().includes(q);
      const ms = !s.cuStatus || r.status === s.cuStatus;
      return mq && ms;
    });
  }, [state]);

  const setCuPersona = useCallback((cuPersona: 'L1' | 'L2') => update({ cuPersona, cuSubView: 'list', cuActiveId: null }), [update]);
  const onCuNewRequest = useCallback(() => update({ cuSubView: 'form', cuForm: emptyCuForm }), [update]);
  const onCuBackToList = useCallback(() => update({ cuSubView: 'list', cuActiveId: null }), [update]);
  const onCuFormField = useCallback((field: keyof CuFormState, value: string) => update(s => ({ cuForm: { ...s.cuForm, [field]: value } })), [update]);

  const onCuSubmitRequest = useCallback(() => {
    setState(s => {
      const f = s.cuForm;
      if (!f.empCode.trim() || !f.email.trim() || !f.mobile.trim()) {
        showToast('Employee code, email and mobile are required', 'error');
        return s;
      }
      if (f.roleMode === 'role' ? !f.role : !f.equivalentEmail.trim()) {
        showToast(f.roleMode === 'role' ? 'Select the role to be assigned' : 'Enter the equivalent user email', 'error');
        return s;
      }
      const id = 'REQ-' + (4022 + s.cuRequests.length);
      const time = stamp();
      const req: CuRequest = {
        id, empCode: f.empCode.trim(), email: f.email.trim(), mobile: f.mobile.trim(),
        roleMode: f.roleMode, role: f.role, equivalentEmail: f.equivalentEmail.trim(), remark: f.remark.trim(),
        raisedBy: 'Jijo John (L1)', raisedAt: time, status: 'Pending with L2', config: null, rejectReason: '',
        logs: [
          { type: 'create', action: `Request raised for ${f.empCode.trim()} · ${f.email.trim()}`, by: 'Jijo John (L1)', time },
          { type: 'login', action: 'Request routed to L2 queue (ITMS Admin)', by: 'System', time },
        ],
      };
      window.setTimeout(() => showToast(`${id} raised — sent to ITMS Admin (L2) for creation`), 0);
      return { ...s, cuRequests: [req, ...s.cuRequests], cuSubView: 'list', cuForm: emptyCuForm };
    });
  }, [showToast]);

  const onCuOpenReview = useCallback((id: string) => {
    setState(s => {
      const r = s.cuRequests.find(x => x.id === id);
      if (!r) return s;
      const eq = r.roleMode === 'equivalent' ? s.umUsers.find(u => u.email.toLowerCase() === r.equivalentEmail.toLowerCase()) : null;
      const guessName = r.email.split('@')[0].split(/[._]/).map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
      const config: CuConfig = r.config || {
        name: guessName,
        userType: 'ITMS',
        role: r.roleMode === 'role' ? r.role : (eq ? eq.role : ''),
        region: '', teamOnly: false, autoLogout: false,
      };
      return { ...s, cuSubView: 'review', cuActiveId: id, cuConfig: config };
    });
  }, []);

  const onCuConfigField = useCallback((field: keyof CuConfig, value: string | boolean) => update(s => ({ cuConfig: { ...s.cuConfig, [field]: value } as CuConfig })), [update]);

  const onCuCreateUser = useCallback(() => {
    setState(s => {
      const r = s.cuRequests.find(x => x.id === s.cuActiveId);
      const c = s.cuConfig;
      if (!r) return s;
      if (!c.name.trim() || !c.role) {
        showToast('Name and role are required before creating the user', 'error');
        return s;
      }
      const time = stamp();
      const newUser: AppUser = {
        id: Date.now(), name: c.name.trim(), email: r.email, mobile: r.mobile,
        role: c.role as AppUser['role'], type: c.userType, added: new Date().toISOString().split('T')[0], active: true,
      };
      const logs = [...r.logs];
      if (r.roleMode === 'equivalent') logs.push({ type: 'perm', action: `Role replicated from ${r.equivalentEmail} → ${c.role}`, by: 'Jijo John (L2 · ITMS Admin)', time });
      logs.push({ type: 'edit', action: `Request configured — ${c.userType} · ${c.role}${c.region ? ' · ' + c.region : ''}${c.teamOnly ? ' · own team only' : ''}${c.autoLogout ? ' · auto-logout' : ''}`, by: 'Jijo John (L2 · ITMS Admin)', time });
      logs.push({ type: 'create', action: `User account created for ${r.email}`, by: 'Jijo John (L2 · ITMS Admin)', time });
      logs.push({ type: 'login', action: `Confirmation email triggered to ${r.raisedBy} and ${r.email}`, by: 'System', time });
      const cuRequests = s.cuRequests.map(x => x.id === r.id ? { ...x, status: 'User Created' as CuStatus, config: { ...c }, logs } : x);
      window.setTimeout(() => showToast(`User created for ${r.email} · email triggered`), 0);
      return { ...s, umUsers: [newUser, ...s.umUsers], cuRequests, cuSubView: 'list', cuEmailOpen: true, cuEmailId: r.id, cuActiveId: null };
    });
  }, [showToast]);

  const onCuOpenReject = useCallback(() => update({ cuRejectOpen: true, cuRejectReason: '' }), [update]);
  const onCuCloseReject = useCallback(() => update({ cuRejectOpen: false }), [update]);
  const onCuConfirmReject = useCallback(() => {
    setState(s => {
      if (!s.cuRejectReason) {
        showToast('Select a rejection reason', 'error');
        return s;
      }
      const time = stamp();
      const cuRequests = s.cuRequests.map(x => x.id === s.cuActiveId ? {
        ...x, status: 'Rejected' as CuStatus, rejectReason: s.cuRejectReason,
        logs: [...x.logs,
          { type: 'delete', action: `Request rejected — ${s.cuRejectReason}`, by: 'Jijo John (L2 · ITMS Admin)', time },
          { type: 'login', action: 'Rejection email triggered to requester', by: 'System', time }],
      } : x);
      window.setTimeout(() => showToast('Request rejected — requester notified'), 0);
      return { ...s, cuRequests, cuRejectOpen: false, cuRejectReason: '', cuSubView: 'list', cuActiveId: null };
    });
  }, [showToast]);

  const onCuOpenLog = useCallback((id: string) => update({ cuLogOpen: true, cuLogId: id }), [update]);
  const onCuCloseLog = useCallback(() => update({ cuLogOpen: false }), [update]);
  const onCuCloseEmail = useCallback(() => update({ cuEmailOpen: false, cuEmailId: null }), [update]);

  // ---- service requests (health case module) ----
  const srFilteredRequests = useCallback((s: AppState = state) => {
    const f = s.srFilters;
    return s.srRequests.filter(r => {
      const compositeStatus = `${r.caseType} ${r.statusSel}`.trim();
      const mReq = !f.reqId || r.id.includes(f.reqId) || r.ticketDisplayId.toLowerCase().includes(f.reqId.toLowerCase());
      const mPolicy = !f.policyNumber || r.policyNumber.toLowerCase().includes(f.policyNumber.toLowerCase());
      const mProposal = !f.proposalNumber || r.proposalNo.toLowerCase().includes(f.proposalNumber.toLowerCase());
      const mCustomer = !f.customerName || r.customerName.toLowerCase().includes(f.customerName.toLowerCase());
      const mMobile = !f.mobile || r.mobile.includes(f.mobile);
      const mEmail = !f.email || r.email.toLowerCase().includes(f.email.toLowerCase());
      const mCaseType = !f.caseType || r.caseType === f.caseType;
      const mInsurer = !f.insurer || r.insurerName === f.insurer;
      const mMedium = !f.medium || r.medium === f.medium;
      const mStatus = !f.status || compositeStatus.toLowerCase().includes(f.status.toLowerCase());
      const mPolicyType = !f.policyType || r.policyType === f.policyType;
      const mBusinessType = !f.businessType || r.businessType === f.businessType;
      const mSource = !f.source || r.subSource === f.source;
      const mPaymentMode = !f.paymentMode || r.quote.paymentMode === f.paymentMode;
      const mMy = !f.myTickets || r.assignedTo === 'Lalita Bisht';
      return mReq && mPolicy && mProposal && mCustomer && mMobile && mEmail && mCaseType && mInsurer
        && mMedium && mStatus && mPolicyType && mBusinessType && mSource && mPaymentMode && mMy;
    });
  }, [state]);

  const onSrFilterField = useCallback((field: keyof SrFilters, value: string | boolean) => update(s => ({ srFilters: { ...s.srFilters, [field]: value } })), [update]);
  const onSrToggleMoreFilters = useCallback(() => update(s => ({ srMoreFiltersOpen: !s.srMoreFiltersOpen })), [update]);
  const onSrSearch = useCallback(() => {
    setState(s => {
      showToast(`Showing ${srFilteredRequests(s).length} request${srFilteredRequests(s).length !== 1 ? 's' : ''}`);
      return s;
    });
  }, [showToast, srFilteredRequests]);
  const onSrResetFilters = useCallback(() => update({
    srFilters: {
      reqId: '', policyNumber: '', proposalNumber: '', customerName: '', mobile: '', email: '',
      caseType: '', insurer: '', medium: '', status: '', policyType: '', businessType: '',
      source: '', paymentMode: '', paymentMethod: '', myTickets: false,
    },
  }), [update]);
  const onSrQuickChip = useCallback((field: keyof SrFilters, value: string) => update(s => ({
    srFilters: { ...s.srFilters, [field]: s.srFilters[field] === value ? '' : value },
  })), [update]);

  const onSrOpenDetails = useCallback((id: string) => update({ srSubView: 'details', srActiveId: id, srRemarksDraft: '', srActivityFilter: 'All', srDirty: false }), [update]);
  const onSrBackToList = useCallback(() => update({ srSubView: 'list', srActiveId: null }), [update]);

  const srUpdateActive = useCallback((patch: Partial<SrRequest>, logEntry?: { type: SrRequest['activityLog'][number]['type']; text: string }) => {
    setState(s => {
      const time = stamp();
      const srRequests = s.srRequests.map(r => {
        if (r.id !== s.srActiveId) return r;
        const activityLog = logEntry ? [{ ...logEntry, by: 'Jijo John', time }, ...r.activityLog] : r.activityLog;
        return { ...r, ...patch, activityLog };
      });
      return { ...s, srRequests, srDirty: false };
    });
  }, []);

  const onSrSetCaseType = useCallback((value: string) => srUpdateActive({ caseType: value }, { type: 'edit', text: `Case type changed to "${value}"` }), [srUpdateActive]);
  const onSrSetStatus = useCallback((value: string) => srUpdateActive({ statusSel: value }, { type: 'toggle', text: `Status changed to "${value}"` }), [srUpdateActive]);
  const onSrToggleCommunication = useCallback(() => {
    setState(s => {
      const r = s.srRequests.find(x => x.id === s.srActiveId);
      if (!r) return s;
      const next = !r.communication;
      const time = stamp();
      const srRequests = s.srRequests.map(x => x.id === r.id ? {
        ...x, communication: next,
        activityLog: [{ type: 'toggle' as const, text: `Communication ${next ? 'enabled' : 'disabled'}`, by: 'Jijo John', time }, ...x.activityLog],
      } : x);
      return { ...s, srRequests };
    });
  }, []);
  const onSrPendingReasonChange = useCallback((value: string) => update(s => ({
    srRequests: s.srRequests.map(r => r.id === s.srActiveId ? { ...r, pendingReason: value } : r), srDirty: true,
  })), [update]);
  const onSrClearPendingReason = useCallback(() => update(s => ({
    srRequests: s.srRequests.map(r => r.id === s.srActiveId ? { ...r, pendingReason: '' } : r),
  })), [update]);
  const onSrPendingWithChange = useCallback((value: string) => srUpdateActive({ pendingWith: value }, { type: 'assign', text: `Pending with set to "${value}"` }), [srUpdateActive]);
  const onSrAssignedToChange = useCallback((id: string, value: string) => {
    setState(s => {
      const time = stamp();
      const srRequests = s.srRequests.map(r => r.id === id ? {
        ...r, assignedTo: value,
        activityLog: [{ type: 'assign' as const, text: `Assigned to "${value || 'Unassigned'}"`, by: 'Jijo John', time }, ...r.activityLog],
      } : r);
      return { ...s, srRequests };
    });
  }, []);
  const onSrSaveCase = useCallback(() => {
    setState(s => {
      const r = s.srRequests.find(x => x.id === s.srActiveId);
      if (!r) return s;
      const time = stamp();
      const srRequests = s.srRequests.map(x => x.id === r.id ? {
        ...x,
        activityLog: [{ type: 'edit' as const, text: `Pending reason set to "${r.pendingReason || '—'}"`, by: 'Jijo John', time }, ...x.activityLog],
      } : x);
      window.setTimeout(() => showToast('Case updated successfully'), 0);
      return { ...s, srRequests, srDirty: false };
    });
  }, [showToast]);
  const onSrRemarksDraftChange = useCallback((value: string) => update({ srRemarksDraft: value }), [update]);
  const onSrSaveRemarks = useCallback(() => {
    setState(s => {
      if (!s.srRemarksDraft.trim()) {
        showToast('Enter a remark before saving', 'error');
        return s;
      }
      const time = stamp();
      const remark = s.srRemarksDraft.trim();
      const srRequests = s.srRequests.map(r => r.id === s.srActiveId ? {
        ...r, remarks: remark,
        activityLog: [{ type: 'create' as const, text: `Remark added: "${remark}"`, by: 'Jijo John', time }, ...r.activityLog],
      } : r);
      window.setTimeout(() => showToast('Remark saved'), 0);
      return { ...s, srRequests, srRemarksDraft: '' };
    });
  }, [showToast]);
  const setSrActivityFilter = useCallback((value: string) => update({ srActivityFilter: value }), [update]);

  // ---- create health request (offline health lead) ----
  const onChrFormField = useCallback(<K extends keyof ChrFormState,>(field: K, value: ChrFormState[K]) => {
    update(s => {
      const chrForm = { ...s.chrForm, [field]: value };
      if (field === 'adults' || field === 'children') {
        chrForm.insuredMembers = chrResizeMembers(s.chrForm.insuredMembers, chrForm.adults, chrForm.children);
      }
      if (field === 'caseType') {
        chrForm.previousPolicyNumber = ''; chrForm.firstInceptionDate = ''; chrForm.gibplPreviousPolicy = ''; chrForm.medicalRequired = '';
      }
      if (field === 'policyDocAvailable' && value !== 'Yes') chrForm.policyDocFileName = '';
      if (field === 'paymentMode' && value !== 'Cheque') {
        chrForm.chequeNumber = ''; chrForm.chequeBank = ''; chrForm.chequeCopyFileName = ''; chrForm.chequeAckFileName = ''; chrForm.chequeAmount = ''; chrForm.chequeDate = '';
      }
      if (field === 'emiYesNo' && value !== 'Yes') { chrForm.paymentFrequency = ''; chrForm.ecsType = ''; }
      return { chrForm };
    });
  }, [update]);
  const onChrMemberField = useCallback((index: number, field: keyof ChrInsuredMember, value: string) => update(s => {
    const insuredMembers = s.chrForm.insuredMembers.map((m, i) => i === index ? { ...m, [field]: value } : m);
    return { chrForm: { ...s.chrForm, insuredMembers } };
  }), [update]);
  const onChrMemberPedToggle = useCallback((index: number, ped: string) => update(s => {
    const insuredMembers = s.chrForm.insuredMembers.map((m, i) => {
      if (i !== index) return m;
      const has = m.pedDetails.includes(ped);
      return { ...m, pedDetails: has ? m.pedDetails.filter(p => p !== ped) : [...m.pedDetails, ped] };
    });
    return { chrForm: { ...s.chrForm, insuredMembers } };
  }), [update]);
  const onChrReset = useCallback(() => update({ chrForm: emptyChrForm }), [update]);

  const onChrSubmit = useCallback(() => {
    setState(s => {
      const f = s.chrForm;
      if (!chrIsValid(f)) {
        showToast('Please fill in all required fields', 'error');
        return s;
      }
      const dealer = CHR_DEALER_LOOKUP[f.dealerCode.toUpperCase()];
      const planType = CHR_PLAN_TYPE_LOOKUP[f.planName] || 'Base Plan';
      const total = Number(f.totalPremium) || 0;
      const tax = Math.round(total * 0.18);
      const gross = total + tax;
      const time = stamp();
      const id = String(40000000 + s.srRequests.length + Math.floor(Math.random() * 900000));
      const customerName = `${f.proposerFirstName.trim()} ${f.proposerLastName.trim()}`.trim();
      const effectiveMembers = chrEffectiveMembers(f);
      const ticketDisplayId = `INS-H-OFF-${id}`;
      const newRequest: SrRequest = {
        id, ticketDisplayId, requestDate: `${new Date().toISOString().split('T')[0]} 00:00`,
        customerName, mobile: f.mobile.trim(), email: f.email.trim(), channelType: 'AGENCY', subSource: 'Offline',
        ageingLabel: '0 Mins', ageingLevel: 'fresh', channelPartner: dealer ? dealer.name : f.dealerCode, city: dealer ? dealer.city : 'N/A',
        caseTag: f.caseType, policyTag: f.policyType, policyNumber: '0', insurerName: f.insurerName, assignedTo: '',
        proposerName: customerName, caseType: 'Medical', statusSel: 'Pending', nstpReason: 'N/A', medium: 'Offline',
        policyType: f.caseType, planType, policySubSource: 'Offline', dealerName: dealer ? dealer.name : f.dealerCode,
        proposalNo: f.proposalNumber.trim(), businessType: f.policyMode === 'retail' ? 'Retail' : 'Group', freshDeskId: 'N/A',
        groupPolicyType: f.policyMode === 'group' ? 'Group' : 'N/A', medicalType: 'N/A', preRequestId: 'N/A',
        brokerName: f.brokerName, localIssuance: f.localIssuance, crossSell: f.crossSell,
        insuredMembers: effectiveMembers.map(m => ({
          relation: m.relationship.toLowerCase(), name: `${m.firstName} ${m.lastName}`.trim(), gender: m.gender, dob: m.dob,
          occupation: '', height: '', weight: '', annualIncome: m.pedDetails.join(', '),
        })),
        quote: {
          insurer: f.insurerName, planName: f.planName, tenure: f.policyTenure, planType,
          baseCoverage: f.sumInsured, topupCoverage: 'N/A', totalCoverage: f.sumInsured, deductibleAmount: 'N/A',
          policyStartDate: 'N/A', policyEndDate: 'N/A', premiumAmount: String(total), totalPremium: String(gross),
          tax: String(tax), paymentMode: f.paymentMode, policyCaseId: 'N/A', healthVisitId: 'N/A',
        },
        transactions: [], paymentReminders: [],
        communication: true, pendingReason: 'Case not picked', pendingWith: '', remarks: '',
        activityLog: [{ type: 'create', text: `Offline health lead created for ${customerName} · ${f.insurerName}`, by: 'Jijo John', time }],
      };
      window.setTimeout(() => showToast(`${ticketDisplayId} created successfully — added to Health Policy List`, 'success', 15000), 0);
      return { ...s, srRequests: [newRequest, ...s.srRequests], chrForm: emptyChrForm };
    });
  }, [showToast]);

  // ---- allocation buckets (health) ----
  const abFilteredBuckets = useCallback((s: AppState = state) => {
    const f = s.abFilters;
    return s.abBuckets.filter(b => {
      const mName = !f.name || b.name.toLowerCase().includes(f.name.toLowerCase());
      const mStatus = f.status === 'all' || (f.status === 'on' ? b.status : !b.status);
      const mCreatedBy = !f.createdBy || b.createdBy.toLowerCase().includes(f.createdBy.toLowerCase());
      const mCreatedDate = !f.createdDate || b.createdAt.includes(f.createdDate);
      const mUpdatedDate = !f.updatedDate || b.updatedAt.includes(f.updatedDate);
      return mName && mStatus && mCreatedBy && mCreatedDate && mUpdatedDate;
    });
  }, [state]);
  const onAbFilterField = useCallback((field: keyof AbFilters, value: string) => update(s => ({ abFilters: { ...s.abFilters, [field]: value } })), [update]);
  const onAbResetFilters = useCallback(() => update({ abFilters: emptyAbFilters }), [update]);
  const onAbOpenAdd = useCallback(() => update({ abModalOpen: true, abEditId: null, abNameDraft: '', abDescDraft: '', abUsersDraft: [], abUserSearch: '' }), [update]);
  const onAbOpenEdit = useCallback((id: string) => {
    setState(s => {
      const b = s.abBuckets.find(x => x.id === id);
      if (!b) return s;
      return { ...s, abModalOpen: true, abEditId: id, abNameDraft: b.name, abDescDraft: b.desc, abUsersDraft: [...b.users], abUserSearch: '' };
    });
  }, []);
  const onAbCloseModal = useCallback(() => update({ abModalOpen: false }), [update]);
  const onAbNameDraftChange = useCallback((v: string) => update({ abNameDraft: v }), [update]);
  const onAbDescDraftChange = useCallback((v: string) => update({ abDescDraft: v }), [update]);
  const onAbUserSearchChange = useCallback((v: string) => update({ abUserSearch: v }), [update]);
  const onAbAddUser = useCallback((name: string) => update(s => s.abUsersDraft.includes(name) ? {} : { abUsersDraft: [...s.abUsersDraft, name], abUserSearch: '' }), [update]);
  const onAbRemoveUser = useCallback((name: string) => update(s => ({ abUsersDraft: s.abUsersDraft.filter(n => n !== name) })), [update]);
  const onAbToggleStatus = useCallback((id: string) => {
    setState(s => {
      const time = stamp();
      const abBuckets = s.abBuckets.map(b => b.id === id ? {
        ...b, status: !b.status, updatedAt: stamp(),
        log: [{ text: `Updated the status: ${!b.status ? 'On' : 'Off'}`, by: 'Jijo John', at: time }, ...b.log],
      } : b);
      return { ...s, abBuckets };
    });
  }, []);
  const onAbSave = useCallback(() => {
    setState(s => {
      const name = s.abNameDraft.trim();
      if (!name || s.abUsersDraft.length === 0) {
        showToast(!name ? 'Bucket name is required' : 'At least one user must be added to the bucket', 'error');
        return s;
      }
      const time = stamp();
      if (s.abEditId) {
        const abBuckets = s.abBuckets.map(b => b.id === s.abEditId ? {
          ...b, name, desc: s.abDescDraft.trim(), users: [...s.abUsersDraft], updatedAt: stamp(),
          log: [{ text: `Updated the bucket name: ${name}`, by: 'Jijo John', at: time }, ...b.log],
        } : b);
        showToast(`Bucket "${name}" updated`);
        return { ...s, abBuckets, abModalOpen: false };
      }
      const newId = 'HEALTH_' + name.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
      const rec = { id: newId, name, desc: s.abDescDraft.trim(), status: false, createdBy: 'Jijo John', createdAt: stamp(), updatedAt: stamp(), users: [...s.abUsersDraft], log: [{ text: 'Created the bucket', by: 'Jijo John', at: time }] };
      showToast(`Bucket "${name}" created`);
      return { ...s, abBuckets: [rec, ...s.abBuckets], abModalOpen: false };
    });
  }, [showToast]);
  const onAbOpenLog = useCallback((id: string) => update({ abLogOpen: true, abLogId: id }), [update]);
  const onAbCloseLog = useCallback(() => update({ abLogOpen: false }), [update]);

  // ---- allocation rules (health) ----
  const arFilteredRules = useCallback((s: AppState = state) => {
    const f = s.arFilters;
    return s.arRules.filter(r => {
      const mName = !f.name || r.name.toLowerCase().includes(f.name.toLowerCase());
      const mModule = f.module === 'all' || r.module === f.module;
      const mStatus = f.status === 'all' || (f.status === 'active' ? r.status : !r.status);
      const mCreatedBy = !f.createdBy || r.createdBy.toLowerCase().includes(f.createdBy.toLowerCase());
      const mLinkBucket = f.linkBucket === 'all' || r.linkedBucket === f.linkBucket;
      const rDate = r.createdAt.slice(0, 10);
      const mCreatedFrom = !f.createdFrom || rDate >= f.createdFrom;
      const mCreatedTo = !f.createdTo || rDate <= f.createdTo;
      const rUpd = r.updatedAt.slice(0, 10);
      const mUpdatedFrom = !f.updatedFrom || rUpd >= f.updatedFrom;
      const mUpdatedTo = !f.updatedTo || rUpd <= f.updatedTo;
      return mName && mModule && mStatus && mCreatedBy && mLinkBucket && mCreatedFrom && mCreatedTo && mUpdatedFrom && mUpdatedTo;
    });
  }, [state]);
  const onArFilterField = useCallback((field: keyof ArFilters, value: string) => update(s => ({ arFilters: { ...s.arFilters, [field]: value } })), [update]);
  const onArResetFilters = useCallback(() => update({ arFilters: emptyArFilters }), [update]);
  const onArOpenAdd = useCallback(() => update({ arModalOpen: true, arEditId: null, arNameDraft: '', arModuleDraft: '', arMaxTicketsDraft: '', arProductTypeDraft: '', arFieldsDraft: [] }), [update]);
  const onArOpenEdit = useCallback((id: string) => {
    setState(s => {
      const r = s.arRules.find(x => x.id === id);
      if (!r) return s;
      return {
        ...s, arModalOpen: true, arEditId: id, arNameDraft: r.name, arModuleDraft: r.module,
        arMaxTicketsDraft: String(r.maxTickets), arProductTypeDraft: r.productType,
        arFieldsDraft: r.fields.map(f => ({ field: f.field, value: Array.isArray(f.value) ? [...f.value] : f.value, confirmed: true })),
      };
    });
  }, []);
  const onArCloseModal = useCallback(() => update({ arModalOpen: false }), [update]);
  const onArNameDraftChange = useCallback((v: string) => update({ arNameDraft: v }), [update]);
  const onArModuleDraftChange = useCallback((v: string) => update({ arModuleDraft: v }), [update]);
  const onArMaxTicketsDraftChange = useCallback((v: string) => update({ arMaxTicketsDraft: v }), [update]);
  const onArProductTypeDraftChange = useCallback((v: string) => update({ arProductTypeDraft: v }), [update]);
  const onArAddFieldRow = useCallback(() => update(s => ({ arFieldsDraft: [...s.arFieldsDraft, { field: '', value: '', confirmed: false }] })), [update]);
  const onArFieldTypeChange = useCallback((idx: number, value: ArFieldKey) => update(s => ({
    arFieldsDraft: s.arFieldsDraft.map((f, i) => i === idx ? { field: value, value: '', confirmed: false } : f),
  })), [update]);
  const onArFieldValueChange = useCallback((idx: number, value: string) => update(s => ({
    arFieldsDraft: s.arFieldsDraft.map((f, i) => i === idx ? { ...f, value } : f),
  })), [update]);
  const onArFieldMultiToggle = useCallback((idx: number, option: string) => update(s => ({
    arFieldsDraft: s.arFieldsDraft.map((f, i) => {
      if (i !== idx) return f;
      const cur = Array.isArray(f.value) ? f.value : [];
      const next = cur.includes(option) ? cur.filter(x => x !== option) : [...cur, option];
      return { ...f, value: next };
    }),
  })), [update]);
  const onArToggleFieldConfirm = useCallback((idx: number) => update(s => ({
    arFieldsDraft: s.arFieldsDraft.map((f, i) => i === idx ? { ...f, confirmed: !f.confirmed } : f),
  })), [update]);
  const onArRemoveFieldRow = useCallback((idx: number) => update(s => ({ arFieldsDraft: s.arFieldsDraft.filter((_, i) => i !== idx) })), [update]);
  const onArToggleStatus = useCallback((id: string) => {
    setState(s => {
      const time = stamp();
      const arRules = s.arRules.map(r => r.id === id ? {
        ...r, status: !r.status, updatedAt: time,
        log: [{ text: `Updated the status: ${!r.status ? 'Active' : 'Inactive'}`, by: 'Jijo John', at: time }, ...r.log],
      } : r);
      return { ...s, arRules };
    });
  }, []);
  const onArLinkBucketChange = useCallback((id: string, bucketId: string) => {
    setState(s => {
      const bucket = s.abBuckets.find(b => b.id === bucketId);
      const time = stamp();
      const arRules = s.arRules.map(r => r.id === id ? {
        ...r, linkedBucket: bucketId, updatedAt: time,
        log: [{ text: `Linked the rule to bucket: ${bucket ? bucket.name : bucketId}`, by: 'Jijo John', at: time }, ...r.log],
      } : r);
      return { ...s, arRules };
    });
  }, []);
  const onArSave = useCallback(() => {
    setState(s => {
      const name = s.arNameDraft.trim();
      const maxTickets = parseInt(s.arMaxTicketsDraft, 10);
      if (!name || !s.arModuleDraft || !maxTickets || maxTickets < 1 || maxTickets > 100 || !s.arProductTypeDraft) {
        showToast('Please fill in all required fields (max tickets must be 1-100)', 'error');
        return s;
      }
      const cleanFields = s.arFieldsDraft.filter(f => f.field && (Array.isArray(f.value) ? f.value.length > 0 : f.value))
        .map(f => ({ field: f.field as ArFieldKey, value: Array.isArray(f.value) ? [...f.value] : f.value }));
      const time = stamp();
      if (s.arEditId) {
        const arRules = s.arRules.map(r => r.id === s.arEditId ? {
          ...r, name, module: s.arModuleDraft, maxTickets, productType: s.arProductTypeDraft, fields: cleanFields, updatedAt: time,
          log: [{ text: `Updated the rule: module ${s.arModuleDraft}, max tickets ${maxTickets}, product type ${s.arProductTypeDraft}`, by: 'Jijo John', at: time }, ...r.log],
        } : r);
        showToast(`Rule "${name}" updated`);
        return { ...s, arRules, arModalOpen: false };
      }
      const newId = 'RULE_' + name.toUpperCase().replace(/[^A-Z0-9]+/g, '_') + '_' + Math.floor(Math.random() * 900 + 100);
      const rec = {
        id: newId, name, module: s.arModuleDraft, status: false, createdAt: time, updatedAt: time, createdBy: 'Jijo John',
        linkedBucket: s.abBuckets[0] ? s.abBuckets[0].id : '', maxTickets, productType: s.arProductTypeDraft, fields: cleanFields,
        log: [{ text: `Created the rule: module ${s.arModuleDraft}, max tickets ${maxTickets}, product type ${s.arProductTypeDraft}`, by: 'Jijo John', at: time }],
      };
      showToast(`Rule "${name}" created`);
      return { ...s, arRules: [rec, ...s.arRules], arModalOpen: false };
    });
  }, [showToast]);
  const onArOpenLog = useCallback((id: string) => update({ arLogOpen: true, arLogId: id }), [update]);
  const onArCloseLog = useCallback(() => update({ arLogOpen: false }), [update]);

  // ---- QC dashboard (health) ----
  const setQcPersona = useCallback((p: QcPersona) => update({ qcPersona: p, qcFilters: emptyQcFilters }), [update]);
  const setQcExecViewer = useCallback((name: string) => update({ qcExecViewer: name }), [update]);
  const setQcTlViewer = useCallback((name: string) => update({ qcTlViewer: name }), [update]);
  const setQcTab = useCallback((t: QcTab) => update({ qcTab: t }), [update]);
  const setQcPeriod = useCallback((p: QcPeriod) => update({ qcPeriod: p }), [update]);
  const setQcCustomRange = useCallback((start: string, end: string) => update({ qcPeriod: 'custom', qcCustomStart: start, qcCustomEnd: end }), [update]);
  const onQcFilterField = useCallback((field: keyof QcFilters, value: string) => update(s => ({ qcFilters: { ...s.qcFilters, [field]: value } })), [update]);
  const onQcResetFilters = useCallback(() => update({ qcFilters: emptyQcFilters }), [update]);
  const toggleQcRow = useCallback((key: string) => update(s => ({
    qcCollapsedRows: s.qcCollapsedRows.includes(key) ? s.qcCollapsedRows.filter(k => k !== key) : [...s.qcCollapsedRows, key],
  })), [update]);
  const onQcOpenDrilldown = useCallback((statusKey: string, statusLabel: string, tatBucket: QcDrilldown['tatBucket']) => update({ qcDrilldown: { statusKey, statusLabel, tatBucket } }), [update]);
  const onQcCloseDrilldown = useCallback(() => update({ qcDrilldown: null }), [update]);
  const onQcSelectHierTl = useCallback((tl: string) => update({ qcHierSelectedTl: tl }), [update]);
  const onQcAddTeamLead = useCallback((name: string) => update(s => ({ qcHierarchy: { ...s.qcHierarchy, [name]: [] }, qcHierSelectedTl: name })), [update]);
  const onQcRemoveTeamLead = useCallback((tl: string) => update(s => {
    const next = { ...s.qcHierarchy };
    delete next[tl];
    const keys = Object.keys(next);
    return { qcHierarchy: next, qcHierSelectedTl: keys[0] || '', qcTlViewer: s.qcTlViewer === tl ? (keys[0] || '') : s.qcTlViewer };
  }), [update]);
  const onQcAddExecutive = useCallback((name: string) => update(s => {
    if (!s.qcHierSelectedTl) return {};
    const cur = s.qcHierarchy[s.qcHierSelectedTl] || [];
    if (cur.includes(name)) return {};
    return { qcHierarchy: { ...s.qcHierarchy, [s.qcHierSelectedTl]: [...cur, name] } };
  }), [update]);
  const onQcRemoveExecutive = useCallback((tl: string, name: string) => update(s => ({
    qcHierarchy: { ...s.qcHierarchy, [tl]: (s.qcHierarchy[tl] || []).filter(e => e !== name) },
  })), [update]);

  return {
    state,
    update,
    showToast,
    onLoginClick, onNavTo, onLogout, onToggleProfile, onToggleSidebar, onToggleUmr, onProfileItem, onSettingsClick,
    umFilteredUsers, onUmAddUser, onUmOpenEdit, onUmBackToList, onUmFormField, onUmSaveUser,
    onUmToggleStatus, onUmOpenDelete, onUmCancelDelete, onUmConfirmDelete, onUmOpenPerms, onUmClosePerms,
    onUmTogglePerm, onUmSavePerms, onUmOpenAlloc, onUmCloseAlloc, onUmSaveAlloc, onUmOpenLog, onUmCloseLog,
    onUmChangePage, onUmGoPage,
    rmFilteredRoles, onRmAddRole, onRmOpenEdit, onRmBackToList, onRmFormField, onRmSaveRole,
    onRmToggleStatus, onRmToggleAuto, onRmChangePage, onRmGoPage, onRmOpenPerms, onRmClosePerms,
    onRmTogglePermItem, onRmSavePerms, onRmOpenUsers, onRmCloseUsers, onRmOpenLog, onRmCloseLog,
    wfOvrFor, onWfResetVertical, onWfResetProduct, onWfPickV, onWfPickP, onWfPickSub, onWfToggleSt,
    onWfToggleAll, onWfSetActiveTab, onWfToggleTransition, onWfCheckAll, onWfClearAll, onWfSave,
    ipFilteredUsers, onIpFilterField, onIpFilterUsers, onIpResetFilters, onIpApproverChange, onIpApproverAdd,
    onIpApproverRemove, onIpSaveApprovers, onIpOpenDetail, onIpCloseDetail, onIpApprove, onIpOpenRej,
    onIpCloseRej, onIpConfirmReject, onIpOpenUpload, onIpCloseUpload, onIpConfirmUpload, setIpTab,
    cuFilteredRequests, setCuPersona, onCuNewRequest, onCuBackToList, onCuFormField, onCuSubmitRequest,
    onCuOpenReview, onCuConfigField, onCuCreateUser, onCuOpenReject, onCuCloseReject, onCuConfirmReject,
    onCuOpenLog, onCuCloseLog, onCuCloseEmail,
    srFilteredRequests, onSrFilterField, onSrToggleMoreFilters, onSrSearch, onSrResetFilters, onSrQuickChip,
    onSrOpenDetails, onSrBackToList, onSrSetCaseType, onSrSetStatus, onSrToggleCommunication,
    onSrPendingReasonChange, onSrClearPendingReason, onSrPendingWithChange, onSrAssignedToChange, onSrSaveCase,
    onSrRemarksDraftChange, onSrSaveRemarks, setSrActivityFilter,
    onToggleHr, onChrFormField, onChrMemberField, onChrMemberPedToggle, onChrReset, onChrSubmit,
    abFilteredBuckets, onAbFilterField, onAbResetFilters, onAbOpenAdd, onAbOpenEdit, onAbCloseModal,
    onAbNameDraftChange, onAbDescDraftChange, onAbUserSearchChange, onAbAddUser, onAbRemoveUser, onAbToggleStatus,
    onAbSave, onAbOpenLog, onAbCloseLog,
    arFilteredRules, onArFilterField, onArResetFilters, onArOpenAdd, onArOpenEdit, onArCloseModal,
    onArNameDraftChange, onArModuleDraftChange, onArMaxTicketsDraftChange, onArProductTypeDraftChange,
    onArAddFieldRow, onArFieldTypeChange, onArFieldValueChange, onArFieldMultiToggle, onArToggleFieldConfirm,
    onArRemoveFieldRow, onArToggleStatus, onArLinkBucketChange, onArSave, onArOpenLog, onArCloseLog,
    setQcPersona, setQcExecViewer, setQcTlViewer, setQcTab, setQcPeriod, setQcCustomRange, onQcFilterField,
    onQcResetFilters, toggleQcRow, onQcOpenDrilldown, onQcCloseDrilldown, onQcSelectHierTl, onQcAddTeamLead,
    onQcRemoveTeamLead, onQcAddExecutive, onQcRemoveExecutive,
  };
}

type AppStoreValue = ReturnType<typeof useAppStoreValue>;

const AppStoreContext = createContext<AppStoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const value = useAppStoreValue();
  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore(): AppStoreValue {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
