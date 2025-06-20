// utils/auth.ts
export function isLoggedIn(): boolean {
  return !!localStorage.getItem("auth_token");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === 'super_admin' || user?.role === 'admin';
}

export function hasRole(role: string): boolean {
  const user = getCurrentUser();
  return user?.role === role || user?.roles?.some((r: any) => r.name === role);
}