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

export type PageKey = 'home' | 'users' | 'roles' | 'workflow' | 'insurer';
