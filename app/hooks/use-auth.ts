import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/apis/auth'
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordByCodeRequest,
  ResetPasswordByTokenRequest,
  VerifyAccountRequest,
} from '@/types/auth'

// Query keys for auth operations
export const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
  token: () => [...authQueryKeys.all, 'token'] as const,
  code: (email: string) => [...authQueryKeys.all, 'code', email] as const,
  profile: () => [...authQueryKeys.all, 'profile'] as const,
}

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      queryClient.setQueryData(authQueryKeys.user(), response.user)
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })
    }
  })
}

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      if (response.token) {
        localStorage.setItem('auth_token', response.token)
      }
      queryClient.setQueryData(authQueryKeys.user(), response.user)
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })
    }
  })
}

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  })
}

// Check code query (GET)
export const useCheckCode = (email?: string, code?: string) => {
  return useQuery({
    queryKey: [...authQueryKeys.code(email ?? ''), code],
    queryFn: () => authApi.checkCode({ email: email as string, code: code as string }),
    enabled: Boolean(email) && Boolean(code),
    staleTime: 60 * 1000,
  })
}

// Check token query (GET)
export const useCheckToken = (token: string) => {
  return useQuery({
    queryKey: [...authQueryKeys.token(), token],
    queryFn: () => authApi.checkToken({ token: token }),
  })
}

// Reset password by code mutation
export const useResetPasswordByCode = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordByCodeRequest) => authApi.resetPasswordByCode(data),
  })
}

// Reset password by token mutation
export const useResetPasswordByToken = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordByTokenRequest) => authApi.resetPasswordByToken(data),
  })
}

// Refresh token mutation
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authApi.refreshToken(),
  })
}

// Logout mutation
export const useLogout = () => {
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      localStorage.removeItem('auth_token')
    }
  })
}

// Verify account mutation
export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: (data: VerifyAccountRequest) => authApi.verifyAccount(data),
  })
}

export const useGetProfile = () => {
  return useQuery({
    queryKey: [...authQueryKeys.profile()],
    queryFn: () => authApi.getProfile(),
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
