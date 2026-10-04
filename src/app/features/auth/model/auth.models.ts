export type Role = 'FARMER' | 'UNDERWRITER' | 'CLAIMS_OFFICER' | 'DATA_PROVIDER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface UserResponse {
  userId: number;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
}

export interface AuthResponse {
  tokenType: string;
  expiresIn: number;
  user: UserResponse;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface ApiErrorResponse {
  status: number;
  errorCode: string;
  message: string;
  path: string;
  timestamp?: string;
  errors?: string[];
}

