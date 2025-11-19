import type { Route } from './+types/index'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Filter, RefreshCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { columns, type UserTableRow } from '@/components/page/user/columns'
import { DataTable } from '@/components/data-table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useUsersQuery } from '@/hooks/use-users-query'
import { useUserFilters } from '@/hooks/use-user-filters'
import { Skeleton } from '@/components/ui/skeleton'
import { ChangeUserRole } from '@/components/page/user/change-user-role'
import { EditUser } from '@/components/page/user/edit-user'
import { LockUser } from '@/components/page/user/lock-user'
import { UnlockUser } from '@/components/page/user/unlock-user'
import { Link } from 'react-router'
import ErrorPage from '@/components/page/error-page'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useUserDialogs } from '@/hooks/use-user-dialogs'
import type { UserStatus } from '@/types/user'
import { useAuthContext } from '@/components/providers/auth-provider'
import AddUser from '@/components/page/user/add-user'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Quản lý người dùng' },
        { name: 'description', content: 'Quản lý và theo dõi các người dùng trong hệ thống' }
    ]
}

const Users = () => {
    const { hasPermission } = useAuthContext()
    const canEdit = hasPermission.USER.EDIT
    const canLock = hasPermission.USER.LOCK
    const canUnlock = hasPermission.USER.UNLOCK
    const canChangeRole = hasPermission.ROLE.CHANGE_ROLE
    const canCreate = hasPermission.USER.CREATE
    const {
        pagination,
        search,
        filter,
        handleFilterChange,
        handleSearchChange,
        handleNextPage,
        handlePreviousPage,
        handlePageChange,
        handleRefresh
    } = useUserFilters()

    const { users, paginationData, isLoading, error } = useUsersQuery({
        pagination,
        filter
    })

    const userDialogs = useUserDialogs(users)

    if (error) return <ErrorPage error={error} retry={handleRefresh} />
    return (
        <div>
            <Card className='border-none shadow-none gap-y-0'>
                <Accordion type='single' collapsible defaultValue='item'>
                    <AccordionItem value='item'>
                        <div className='flex justify-between items-center px-4 border-b pb-6'>
                            <div>
                                <CardTitle>Danh sách người dùng</CardTitle>
                                <div className='text-sm text-muted-foreground pt-0.5'>
                                    {isLoading && <Skeleton className='w-32 h-4' />}
                                    {!isLoading && (
                                        <>
                                            Tổng cộng {paginationData?.total || users.length} người dùng
                                            {paginationData &&
                                                ` (Trang ${paginationData.page || 1}/${paginationData.totalPages || 1})`}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                {canCreate && (
                                    <Link to='/users?create=true'>
                                        <Button className='rounded-full'>Thêm mới</Button>
                                    </Link>
                                )}
                                <Tooltip>
                                    <AccordionTrigger asChild>
                                        <TooltipTrigger asChild>
                                            <Button
                                                className='rounded-full gap-x-1 justify-center items-center p-0 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground'
                                                variant='secondary'
                                                size='icon'
                                            >
                                                <Filter className='size-4' />
                                            </Button>
                                        </TooltipTrigger>
                                    </AccordionTrigger>
                                    <TooltipContent>
                                        <p>Bộ lọc</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                        <AccordionContent className='pb-0'>
                            <div className='px-4 py-2 border-b flex items-center justify-end gap-x-2'>
                                <div className='flex items-center bg-muted rounded-full p-1'>
                                    <Input
                                        placeholder='Tìm kiếm người dùng...'
                                        className='py-1 px-2.5'
                                        value={search}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                    />
                                </div>
                                <Select
                                    value={filter?.status}
                                    onValueChange={(status) =>
                                        handleFilterChange({ ...filter, status: status as UserStatus })
                                    }
                                >
                                    <SelectTrigger className='rounded-full w-44'>
                                        <SelectValue placeholder='Trạng thái' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='active'>Hoạt động</SelectItem>
                                        <SelectItem value='inactive'>Không hoạt động</SelectItem>
                                    </SelectContent>
                                </Select>
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
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className='px-4 pt-4'>
                    <DataTable
                        columns={columns}
                        data={users as UserTableRow[]}
                        isLoading={isLoading}
                        pagination={paginationData}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        onPageChange={handlePageChange}
                        getRowId={(row) => row.id || ''}
                    />
                </div>
            </Card>
            {canChangeRole && (
                <ChangeUserRole
                    userId={userDialogs.changeRoleUserId}
                    open={userDialogs.isChangeRoleOpen}
                    onOpenChange={userDialogs.handleChangeRoleOpenChange}
                />
            )}
            {canEdit && (
                <EditUser
                    user={userDialogs.editingUser}
                    userId={userDialogs.editUserId}
                    open={userDialogs.isEditOpen}
                    onOpenChange={userDialogs.handleOpenChange}
                    onSuccess={() => userDialogs.handleSuccess('Cập nhật người dùng thành công!')}
                />
            )}
            {canLock && (
                <LockUser
                    user={userDialogs.lockedUser}
                    open={userDialogs.isLockedOpen}
                    onOpenChange={userDialogs.handleLockedOpenChange}
                    onSuccess={() => {
                        userDialogs.handleSuccess('Khóa người dùng thành công!')
                        userDialogs.handleLockedOpenChange()
                    }}
                />
            )}
            {canUnlock && (
                <UnlockUser
                    user={userDialogs.unlockedUser}
                    reason={userDialogs.unlockedUserReason}
                    open={userDialogs.isUnlockedOpen}
                    onOpenChange={userDialogs.handleUnlockedOpenChange}
                    onSuccess={() => userDialogs.handleSuccess('Mở khóa người dùng thành công!')}
                />
            )}

            {canCreate && (
                <AddUser
                    open={userDialogs.isAddOpen}
                    onOpenChange={userDialogs.handleAddOpenChange}
                    onSuccess={(id) => userDialogs.handleAddSuccess('Thêm người dùng thành công!', id)}
                />
            )}
        </div>
    )
}

export default function UserPage() {
    return <Users />
}
