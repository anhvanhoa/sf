import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import type { Permission } from '@/types/permission'
import ErrorPage from '@/components/page/error-page'
import AddRoleWithPer from './add-role-with-per'
import { ViewRolesList } from './view-roles-list'
import { ViewRolesDeleteConfirm } from './view-roles-delete-confirm'
import { useViewRoles } from '@/hooks/use-view-roles'

interface ViewRolesProps {
    permission?: Permission
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const ViewRoles = ({ permission, open, onOpenChange }: ViewRolesProps) => {
    const {
        roles,
        isLoading,
        error,
        refetch,
        deleteRoleId,
        addRole,
        setAddRole,
        deleteRole,
        confirmDeleteRole,
        cancelDelete,
        cancelDeleteRole,
        onSubmitDeleteRole
    } = useViewRoles({ permission, onOpenChange })

    const selectedRole = roles.find((role) => role.id === deleteRoleId)

    return (
        <Dialog open={open} onOpenChange={cancelDeleteRole}>
            <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
                {!deleteRoleId && !addRole && (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                Vai trò được gán cho quyền
                                <span className='pl-1 text-primary'>{permission?.action}</span>
                            </DialogTitle>
                            <DialogDescription>
                                Danh sách các vai trò có quyền {permission?.resource}:{permission?.action}
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            {error && <ErrorPage error={error} retry={refetch} className='py-8' />}
                            {!error && !isLoading && roles.length === 0 && (
                                <div className='text-center py-8 text-muted-foreground'>
                                    Không có vai trò nào được gán cho quyền này
                                </div>
                            )}
                            {!error && !isLoading && roles.length > 0 && (
                                <ViewRolesList
                                    roles={roles}
                                    onAddRole={() => setAddRole(true)}
                                    onDeleteRole={confirmDeleteRole}
                                />
                            )}
                        </div>
                    </>
                )}
                {!deleteRoleId && addRole && permission && (
                    <AddRoleWithPer
                        permission={permission}
                        open={addRole}
                        onOpenChange={setAddRole}
                        excludedRoleIds={roles.map((role) => role.id)}
                        onSuccess={() => {
                            setAddRole(false)
                            refetch()
                        }}
                    />
                )}
                {deleteRoleId && (
                    <ViewRolesDeleteConfirm
                        role={selectedRole}
                        permission={permission}
                        isPending={deleteRole.isPending}
                        onCancel={cancelDelete}
                        onConfirm={onSubmitDeleteRole}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
