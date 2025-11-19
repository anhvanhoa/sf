import { useQuery } from '@tanstack/react-query'
import { getDataFilter } from '@/apis/permission'
import { useMemo } from 'react'

export function usePermissionDataFilter() {
    const { data: filterData, ...rest } = useQuery({
        queryKey: ['permissions', 'data-filter'],
        queryFn: () => getDataFilter(),
        staleTime: 1000 * 60 * 10, // 10 minutes - resources don't change often
    })

    const resourceOptions = useMemo(() => {
        return (filterData?.resources || []).map((resource) => {
            const res = resource.split('.')
            const label = res[res.length - 1]
            return {
                value: resource,
                label,
            }
        })
    }, [filterData])

    return {
        filterData,
        resourceOptions,
        ...rest,
    }
}

