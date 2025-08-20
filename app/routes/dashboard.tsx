import type { Route } from './+types/dashboard'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Hello' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
    return <div className='flex flex-1 flex-col gap-4 p-4 pt-4'>Home</div>
}
