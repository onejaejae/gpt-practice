import { Union } from 'src/common/type/common.interface';

export const UserRole = {
  Admin: 'admin',
  User: 'user',
} as const;
export type UserRole = Union<typeof UserRole>;
