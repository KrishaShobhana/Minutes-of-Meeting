export type UserRole = 'admin' | 'convener' | 'staff';

export interface User {
  email: string;
  role: UserRole;
}
