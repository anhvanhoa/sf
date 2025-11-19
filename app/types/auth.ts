// Auth API Types based on Swagger definitions

export interface UserInfo {
  id?: string
  email?: string
  phone?: string
  fullName?: string
  avatar?: string
  bio?: string
  address?: string
  birthday?: string // date-time
}

export enum ForgotPasswordType {
  FORGOT_PASSWORD_TYPE_UNSPECIFIED = 'FORGOT_PASSWORD_TYPE_UNSPECIFIED',
  FORGOT_PASSWORD_TYPE_TOKEN = 'FORGOT_PASSWORD_TYPE_TOKEN',
}

// Request types
export interface LoginRequest {
  emailOrPhone: string
  password: string
  os?: string
}

export interface RegisterRequest {
  email: string
  fullName: string
  password: string
  confirmPassword: string
}

export interface ForgotPasswordRequest {
  email: string
  os?: string
  method?: ForgotPasswordType
}

export interface CheckCodeRequest {
  code: string
  email: string
}

export interface CheckTokenRequest {
  token: string
}

export interface ResetPasswordByCodeRequest {
  code: string
  email: string
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordByTokenRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface VerifyAccountRequest {
  token: string
}

// Response types
export interface LoginResponse {
  user: UserInfo
  accessToken: string
  refreshToken: string
  message: string
}

export interface RegisterResponse {
  user: UserInfo
  token: string
  message: string
}

export interface ForgotPasswordResponse {
  user: UserInfo
  token: string
  code: string
  message: string
}

export interface CheckCodeResponse {
  valid: boolean
  message: string
}

export interface CheckTokenResponse {
  data: boolean
  message: string
}

export interface ResetPasswordByCodeResponse {
  message: string
}

export interface ResetPasswordByTokenResponse {
  message: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  message: string
}

export interface LogoutResponse {
  message: string
}

export interface VerifyAccountResponse {
  message: string
}

export interface ProfileResponse {
  user: UserInfo
  roles: string[]
  permissions: Array<{
    resource: string
    action: string
  }>
  scopes: Array<{
    resource: string
    resourceData?: Record<string, string>
    action: string
  }>
  message: string
}
