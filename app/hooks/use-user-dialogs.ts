import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { User } from '@/types/user'
import { useAuthContext } from '@/components/providers/auth-provider'

export function useUserDialogs(users: User[]) {
    const navigate = useNavigate()
    const { hasPermission } = useAuthContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const editUserId = searchParams.get('edit') ?? undefined
    const lockedUserId = searchParams.get('locked') ?? undefined
    const unlockUserId = searchParams.get('unlock') ?? undefined
    const changeRoleUserId = searchParams.get('change-role') ?? undefined
    const createMode = searchParams.get('create') === 'true'

    const editingUser = useMemo(() => {
        return users.find((user) => user.id === editUserId)
    }, [users, editUserId])

    const lockedUser = useMemo(() => {
        return users.find((user) => user.id === lockedUserId)
    }, [users, lockedUserId])

    const unlockedUser = useMemo(() => {
        return users.find((user) => user.id === unlockUserId)
    }, [users, unlockUserId])
        
    const unlockedUserReason = useMemo(() => {
        return users.find((user) => user.id === unlockUserId)?.lockedReason
    }, [users, unlockUserId])

    const handleOpenChange = () => {
        setSearchParams((prev) => {
            prev.delete('edit')
            return prev
        })
    }

    const handleLockedOpenChange = () => {
        setSearchParams((prev) => {
            prev.delete('locked')
            return prev
        })
    }

    const handleUnlockedOpenChange = () => {
        setSearchParams((prev) => {
            prev.delete('unlock')
            return prev
        })
    }

    const handleChangeRoleOpenChange = () => {
        setSearchParams((prev) => {
            prev.delete('change-role')
            return prev
        })
    }

    const handleAddOpenChange = () => {
        setSearchParams((prev) => {
            prev.delete('create')
            return prev
        })
    }

    const handleSuccess = (message: string = 'Thao tác thành công!') => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        toast.success(message)
    }

    const handleAddSuccess = (message: string = 'Thêm người dùng thành công!', id?: string) => {
        handleSuccess(message)
        if (hasPermission.ROLE.CHANGE_ROLE && id) {
            navigate(`/users?change-role=${id}`, { replace: true })
        }
    }

    return {
        editUserId,
        editingUser,
        lockedUserId,
        lockedUser,
        unlockUserId,
        unlockedUser,
        changeRoleUserId,
        isEditOpen: Boolean(editUserId),
        isLockedOpen: Boolean(lockedUserId),
        isUnlockedOpen: Boolean(unlockUserId),
        isChangeRoleOpen: Boolean(changeRoleUserId),
        isAddOpen: createMode,
        unlockedUserReason,
        handleOpenChange,
        handleLockedOpenChange,
        handleUnlockedOpenChange,
        handleChangeRoleOpenChange,
        handleAddOpenChange,
        handleSuccess,
        handleAddSuccess
    }
}
