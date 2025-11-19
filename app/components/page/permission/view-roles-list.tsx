import { Button } from '@/components/ui/button'
import { PlusIcon, Trash2 } from 'lucide-react'
import type { Role } from '@/types/role'

interface ViewRolesListProps {
    roles: Role[]
    onAddRole: () => void
    onDeleteRole: (roleId: string) => void
}

export const ViewRolesList = ({ roles, onAddRole, onDeleteRole }: ViewRolesListProps) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='border border-dashed rounded-md p-3 flex items-center justify-between'>
                <p className='text-sm font-medium'>Thêm vai trò mới</p>
                <Button variant='secondary' size='icon' onClick={onAddRole}>
                    <PlusIcon className='size-4' />
                </Button>
            </div>
            {roles.map((role) => (
                <div key={role.id} className='border rounded-md p-3 flex items-center justify-between'>
                    <h3 className='text-sm font-medium'>{role.name}</h3>
                    <Button
                        onClick={() => onDeleteRole(role.id)}
                        variant='ghost'
                        className='size-7 p-0 text-destructive hover:text-destructive'
                    >
                        <Trash2 className='size-4' />
                    </Button>
                </div>
            ))}
        </div>
    )
}

