import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { Role } from '@/types/role'
import type { Permission } from '@/types/permission'

interface ViewRolesDeleteConfirmProps {
    role: Role | undefined
    permission?: Permission
    isPending: boolean
    onCancel: () => void
    onConfirm: () => void
}

export const ViewRolesDeleteConfirm = ({
    role,
    permission,
    isPending,
    onCancel,
    onConfirm
}: ViewRolesDeleteConfirmProps) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Xóa vai trò khỏi quyền</DialogTitle>
                <DialogDescription>
                    <p className='text-sm text-muted-foreground'>
                        Vai trò
                        <span className='font-semibold text-foreground px-1'>{role?.name}</span>
                        sẽ bị xóa khỏi quyền{' '}
                        <span className='font-semibold text-primary'>{permission?.action}</span>. Hành động này không
                        thể hoàn tác.
                    </p>
                </DialogDescription>
                <DialogFooter>
                    <Button size='sm' variant='outline' onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button size='sm' variant='destructive' onClick={onConfirm}>
                        {isPending && (
                            <>
                                <Spinner />
                                Đang xóa...
                            </>
                        )}
                        {!isPending && 'Xóa'}
                    </Button>
                </DialogFooter>
            </DialogHeader>
        </>
    )
}

