import type { Route } from './+types/index'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { RefreshCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { permissionsColumns, type PermissionTableRow } from '@/components/page/permission/columns'
import { EditPermission } from '@/components/page/permission/edit-permission'
import { DataTable } from '@/components/data-table'
import { SingleSelect } from '@/components/ui/single-select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { usePermissionFilters } from '@/hooks/use-permission-filters'
import { usePermissionDataFilter } from '@/hooks/use-permission-data-filter'
import { usePermissionsQuery } from '@/hooks/use-permissions-query'
import { usePermissionEdit } from '@/hooks/use-permission-edit'
import { usePermissionRoles } from '@/hooks/use-permission-roles'
import { ViewRoles } from '@/components/page/permission/view-roles'
import ErrorPage from '@/components/page/error-page'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Quản lý quyền' },
        { name: 'description', content: 'Quản lý và theo dõi các quyền trong hệ thống' }
    ]
}

const Permissions = () => {
    const {
        pagination,
        search,
        selectedResources,
        handleSearchChange,
        handleSelectedResourcesChange,
        handleNextPage,
        handlePreviousPage,
        handlePageChange
    } = usePermissionFilters()

    const { resourceOptions } = usePermissionDataFilter()

    const { permissions, paginationData, isLoading, error, refetch } = usePermissionsQuery({
        pagination,
        selectedResources
    })
    const { editingPermission, isOpen, handleOpenChange, handleSuccess } = usePermissionEdit(permissions)
    const { selectedPermission, isOpen: isRolesOpen, handleOpenChange: handleRolesOpenChange } = usePermissionRoles(permissions)

    if (error) return <ErrorPage error={error} retry={refetch} />
    return (
        <div>
            <Card className='border-none shadow-none gap-y-0'>
                <div className='flex justify-between items-center px-4 border-b pb-6'>
                    <div>
                        <CardTitle>Danh sách quyền</CardTitle>
                        <p className='text-sm text-muted-foreground pt-0.5'>
                            {isLoading ? (
                                'Đang tải...'
                            ) : (
                                <>
                                    Tổng cộng {permissions.length} quyền
                                    {paginationData &&
                                        ` (Trang ${paginationData.page || 1}/${paginationData.totalPages || 1})`}
                                </>
                            )}
                        </p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <div className='flex items-center bg-muted rounded-full p-1'>
                            <Input
                                placeholder='Tìm kiếm quyền...'
                                className='py-1 px-2.5'
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        </div>
                        <SingleSelect
                            options={resourceOptions}
                            placeholder='Chọn service'
                            value={selectedResources}
                            onChange={handleSelectedResourcesChange}
                            textSearch='Tìm kiếm...'
                            className='w-[250px]'
                            classTrigger='w-[250px] rounded-full'
                            variant='secondary'
                        />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className='rounded-full' variant='secondary' size='icon'>
                                    <RefreshCcw className='size-4' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Làm mới</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className='px-4 pt-4'>
                    <DataTable
                        columns={permissionsColumns}
                        data={permissions as PermissionTableRow[]}
                        isLoading={isLoading}
                        pagination={paginationData}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Card>
            <EditPermission
                permission={editingPermission}
                open={isOpen}
                onOpenChange={handleOpenChange}
                onSuccess={handleSuccess}
            />
            <ViewRoles
                permission={selectedPermission}
                open={isRolesOpen}
                onOpenChange={handleRolesOpenChange}
            />
        </div>
    )
}

export default function PermissionPage() {
    return <Permissions />
}
