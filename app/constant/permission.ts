export const PERMISSIONS = {
    USER: {
        LOCK: {
            resource: 'user.v1.UserService',
            action: 'LockUser'
        },
        UNLOCK: {
            resource: 'user.v1.UserService',
            action: 'UnlockUser'
        },
        EDIT: {
            resource: 'user.v1.UserService',
            action: 'UpdateUser'
        },
        CREATE: {
            resource: 'user.v1.UserService',
            action: 'CreateUser'
        }
    },
    ROLE: {
        CHANGE_ROLE: {
            resource: 'user_role.v1.UserRoleService',
            action: 'AttachUserRoles'
        },
        ASSIGN_PERMISSIONS: {
            resource: 'role_permission.v1.RolePermissionService',
            action: 'AttachRolePermissions'
        },
        DELETE: {
            resource: 'role.v1.RoleService',
            action: 'DeleteRole'
        },
        EDIT: {
            resource: 'role.v1.RoleService',
            action: 'UpdateRole'
        },
        CREATE: {
            resource: 'role.v1.RoleService',
            action: 'CreateRole'
        }
    },
    PERMISSION: {
        EDIT: {
            resource: 'permission.v1.PermissionService',
            action: 'UpdatePermission'
        }
    }
}
