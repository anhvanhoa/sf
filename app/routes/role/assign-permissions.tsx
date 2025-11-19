import { Card, CardTitle } from '@/components/ui/card'
import type { Route } from './+types/assign-permissions'
import { roleApi } from '@/apis/roles'
import { handleLoaderError } from '@/lib/error'
import { assignPermissionsColumns, type PermissionTableRow } from '@/components/page/permission/columns'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { SingleSelect } from '@/components/ui/single-select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { RefreshCcw, Save } from 'lucide-react'
import { usePermissionFilters } from '@/hooks/use-permission-filters'
import { usePermissionDataFilter } from '@/hooks/use-permission-data-filter'
import { usePermissionsQuery } from '@/hooks/use-permissions-query'
import { useState } from 'react'
import type { RowSelectionState } from '@tanstack/react-table'
import { rolePermissionApi } from '@/apis/role-permissions'
import { useMutation } from '@tanstack/react-query'
import type { AttachRolePermissionsRequest } from '@/types/role-permission'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import ErrorPage from '@/components/page/error-page'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const role = await roleApi.getRoleById(params.id).then((res) => res.role)
        const permissionIds = await rolePermissionApi
            .listRolePermissions({
                filter: {
                    roleId: params.id
                }
            })
            .then((res) =>
                res.rolePermissions.reduce<Record<string, boolean>>((acc, permission) => {
                    acc[permission.permissionId] = true
                    return acc
                }, {})
            )
        return {
            role,
            permissionIds
        }
    } catch (error) {
        throw handleLoaderError(error, '/roles')
    }
}

export function meta({ loaderData }: Route.MetaArgs) {
    const { role } = loaderData
    return [
        {
            title: `Gán quyền cho vai trò ${role?.name}`,
            description: `Gán quyền cho vai trò ${role?.name}`
        }
    ]
}

const AssignPermissions = (props: Route.ComponentProps) => {
    const { role, permissionIds } = props.loaderData
    const [selectedPermissions, setSelectedPermissions] = useState<RowSelectionState>(permissionIds)
    const attachRP = useMutation({
        mutationFn: (data: AttachRolePermissionsRequest) => rolePermissionApi.attachRolePermissions(data),
        onSuccess: () => {
            toast.success('Quyền đã được gán thành công')
        },
        onError: (error) => {
            toast.error(error.message)
            setSelectedPermissions(permissionIds)
        }
    })
    const {
        pagination,
        search,
        selectedResources,
        handleSearchChange,
        handleSelectedResourcesChange,
        handleNextPage,
        handlePreviousPage,
        handlePageChange,
        handleRefresh
    } = usePermissionFilters()
    const { resourceOptions } = usePermissionDataFilter()
    const { permissions, paginationData, isLoading, error, refetch } = usePermissionsQuery({
        pagination,
        selectedResources
    })
    if (error) return <ErrorPage error={error} retry={refetch}/>
    const RoleName = () => <span className='text-primary'>{role?.name}</span>
    const handleSave = () => {
        attachRP.mutate({
            permissionIds: Object.entries(selectedPermissions)
                .filter(([_, value]) => value)
                .map(([key]) => key),
            roleIds: [role.id]
        })
    }
    return (
        <div>
            <Card className='border-none shadow-none gap-y-0'>
                <div className='flex justify-between items-center px-4 border-b pb-6'>
                    <div>
                        <CardTitle>
                            Gán quyền cho <RoleName />
                        </CardTitle>
                        <p className='text-sm text-muted-foreground pt-0.5'>
                            Áp dụng quyền để thực hiện các hành động trên hệ thống
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
                                <Button
                                    className='rounded-full'
                                    variant='secondary'
                                    size='icon'
                                    onClick={() => handleRefresh()}
                                >
                                    <RefreshCcw className='size-4' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Làm mới</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    disabled={attachRP.isPending}
                                    className='rounded-full'
                                    size='icon'
                                    onClick={handleSave}
                                >
                                    {attachRP.isPending && <Spinner />}
                                    {!attachRP.isPending && <Save className='size-4' />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Lưu</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className='px-4 pt-4'>
                    <DataTable
                        columns={assignPermissionsColumns}
                        data={permissions as PermissionTableRow[]}
                        selectedRows={selectedPermissions}
                        onSelectedRowsChange={setSelectedPermissions}
                        isLoading={isLoading}
                        pagination={paginationData}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        onPageChange={handlePageChange}
                        getRowId={(row) => row.id}
                    />
                </div>
            </Card>
        </div>
    )
}

export default AssignPermissions
