import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import type { AppUser, AppRole, ToastState, PageKey, IpApprover, IpUserRequest } from '../types';
import {
  INIT_USERS, INIT_ROLES, INIT_IP_APPROVERS, INIT_IP_USERS, WF,
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

export interface AppState {
  view: 'login' | 'app';
  loggingIn: string | false;
  page: PageKey;
  toast: ToastState | null;
  profileOpen: boolean;
  lastLoginTime: string;
  sessionVia: string;
  todayDate: string;

  umUsers: AppUser[];
  umSearch: string;
  umStatus: string;
  umType: string;
  umTab: string;
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
}

const initialState: AppState = {
  view: 'login',
  loggingIn: false,
  page: 'home',
  toast: null,
  profileOpen: false,
  lastLoginTime: '—', sessionVia: '—', todayDate: '—',

  umUsers: INIT_USERS,
  umSearch: '', umStatus: '', umType: '', umTab: 'ITMS',
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
};

type Updater = Partial<AppState> | ((s: AppState) => Partial<AppState>);

function useAppStoreValue() {
  const [state, setState] = useState<AppState>(initialState);
  const toastTimer = useRef<number | undefined>(undefined);

  const update = useCallback((patch: Updater) => {
    setState(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  }, []);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    window.clearTimeout(toastTimer.current);
    update({ toast: { msg, type } });
    toastTimer.current = window.setTimeout(() => update({ toast: null }), 3400);
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
  const onRmOpenPerms = useCallback((id: number) => update({ rmPermsOpen: true, rmPermsRoleId: id, rmPermsChecked: {} }), [update]);
  const onRmClosePerms = useCallback(() => update({ rmPermsOpen: false }), [update]);
  const onRmTogglePermItem = useCallback((key: string) => update(s => ({ rmPermsChecked: { ...s.rmPermsChecked, [key]: !s.rmPermsChecked[key] } })), [update]);
  const onRmSavePerms = useCallback(() => { update({ rmPermsOpen: false }); showToast('Permissions saved successfully!'); }, [update, showToast]);
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

  const navItemStyle = useCallback((page: PageKey): { active: boolean } => ({ active: state.page === page }), [state.page]);

  return {
    state,
    update,
    showToast,
    onLoginClick, onNavTo, onLogout, onToggleProfile, onProfileItem, onSettingsClick,
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
    navItemStyle,
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
