import type { Route } from './+types/index'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { RefreshCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'
import { columns, type RoleTableRow } from '@/components/page/role/columns'
import { EditRole } from '@/components/page/role/edit-role'
import { DeleteRole } from '@/components/page/role/delete-role'
import { DataTable } from '@/components/data-table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useRolesQuery } from '@/hooks/use-roles-query'
import { useRoleEdit } from '@/hooks/use-role-edit'
import { useState, useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import ErrorPage from '@/components/page/error-page'
import { useAuthContext } from '@/components/providers/auth-provider'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Quản lý vai trò' },
        { name: 'description', content: 'Quản lý và theo dõi các vai trò trong hệ thống' }
    ]
}

const Roles = () => {
    const { hasPermission } = useAuthContext()
    const canCreate = hasPermission.ROLE.CREATE
    const canEdit = hasPermission.ROLE.EDIT
    const canDelete = hasPermission.ROLE.DELETE
    const [search, setSearch] = useState<string>('')
    const { roles, isLoading, error, refetch } = useRolesQuery()
    const handleRefresh = () => setSearch('')
    const filteredRoles = useMemo(() => {
        if (!search) return roles
        const searchLower = search.toLowerCase()
        return roles.filter(
            (role) =>
                role.name?.toLowerCase().includes(searchLower) ||
                role.description?.toLowerCase().includes(searchLower) ||
                role.variant?.toLowerCase().includes(searchLower)
        )
    }, [roles, search])
    const {
        editingRole,
        deletingRole,
        createMode,
        isOpen,
        isDeleteOpen,
        handleOpenChange,
        handleDeleteOpenChange,
        handleSuccess
    } = useRoleEdit(roles)

    if (error) return <ErrorPage error={error} retry={refetch} />

    return (
        <div>
            <Card className='border-none shadow-none gap-y-0'>
                <div className='flex justify-between items-center px-4 border-b pb-6'>
                    <div>
                        <CardTitle>Danh sách vai trò</CardTitle>
                        <div className='text-sm text-muted-foreground pt-0.5'>
                            {isLoading && <Skeleton className='w-32 h-4' />}
                            {!isLoading && <>Tổng cộng {filteredRoles.length} vai trò</>}
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <div className='flex items-center bg-muted rounded-full p-1'>
                            <Input
                                placeholder='Tìm kiếm vai trò...'
                                className='py-1 px-2.5'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className='rounded-full'
                                    variant='secondary'
                                    size='icon'
                                    onClick={handleRefresh}
                                    disabled={isLoading}
                                >
                                    <RefreshCcw className='size-4' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Làm mới</p>
                            </TooltipContent>
                        </Tooltip>
                        {canCreate && (
                            <Link to='/roles?create=true'>
                                <Button className='rounded-full'>Thêm mới</Button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className='px-4 pt-4'>
                    <DataTable columns={columns} data={filteredRoles as RoleTableRow[]} isLoading={isLoading} />
                </div>
            </Card>
            {canEdit && (
                <EditRole
                    role={editingRole}
                    open={isOpen}
                    onOpenChange={handleOpenChange}
                    onSuccess={() =>
                        handleSuccess(createMode ? 'Tạo vai trò thành công!' : 'Cập nhật vai trò thành công!')
                    }
                    isCreate={createMode}
                />
            )}
            {canDelete && (
                <DeleteRole
                    role={deletingRole}
                    open={isDeleteOpen}
                    onOpenChange={handleDeleteOpenChange}
                    onSuccess={() => handleSuccess('Xóa vai trò thành công!')}
                />
            )}
        </div>
    )
}

export default function RolePage() {
    return <Roles />
}
