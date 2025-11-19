import { api } from '@/lib/axios'
import {
    type LoginRequest,
    type LoginResponse,
    type RegisterRequest,
    type RegisterResponse,
    type ForgotPasswordRequest,
    type ForgotPasswordResponse,
    type CheckCodeRequest,
    type CheckCodeResponse,
    type CheckTokenRequest,
    type CheckTokenResponse,
    type ResetPasswordByCodeRequest,
    type ResetPasswordByCodeResponse,
    type ResetPasswordByTokenRequest,
    type ResetPasswordByTokenResponse,
    type RefreshTokenResponse,
    type LogoutResponse,
    type VerifyAccountRequest,
    type VerifyAccountResponse,
    ForgotPasswordType,
    type ProfileResponse,
} from '@/types/auth'

// Auth API functions using the shared axios client
export const authApi = {
    // Login and authentication
    login: (data: LoginRequest): Promise<LoginResponse> => api.post('/auth/login', data),

    // User registration
    register: (data: RegisterRequest): Promise<RegisterResponse> => api.post('/auth/register', data),

    // Password reset flow
    forgotPassword: (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> =>
        api.post('/auth/forgot-password', {
            ...data,
            method: ForgotPasswordType.FORGOT_PASSWORD_TYPE_TOKEN
        }),

    // Code verification
    checkCode: (data: CheckCodeRequest): Promise<CheckCodeResponse> =>
        api.get(`/auth/check-code/${data.code}/${data.email}`),

    // Token verification
    checkToken: (data: CheckTokenRequest): Promise<CheckTokenResponse> => api.get(`/auth/check-token/${data.token}`),

    // Reset password by code
    resetPasswordByCode: (data: ResetPasswordByCodeRequest): Promise<ResetPasswordByCodeResponse> =>
        api.post('/auth/reset-password-by-code', data),

    // Reset password by token
    resetPasswordByToken: (data: ResetPasswordByTokenRequest): Promise<ResetPasswordByTokenResponse> =>
        api.post('/auth/reset-password-by-token', data),

    // Token refresh
    refreshToken: (): Promise<RefreshTokenResponse> => api.post('/auth/refresh'),

    // Logout
    logout: (): Promise<LogoutResponse> => api.post('/auth/logout'),

    // Account verification
    verifyAccount: (data: VerifyAccountRequest): Promise<VerifyAccountResponse> =>
        api.post('/auth/verify-account', data),

    // Get profile
    getProfile: (): Promise<ProfileResponse> => api.get('/auth/profile')
}
