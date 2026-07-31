export function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return '••••••';
  const visible = user.slice(0, 2);
  return `${visible}${'•'.repeat(Math.max(3, user.length - 2))}@${domain}`;
}

export function maskMobile(mobile: string): string {
  if (!mobile || mobile.length < 4) return '••••••';
  return `••••••${mobile.slice(-4)}`;
}
