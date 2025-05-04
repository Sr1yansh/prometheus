import { UserRole } from '../database/models/user';

export interface JWTPayload {
  id: number;
  email: string;
  role: UserRole;
}