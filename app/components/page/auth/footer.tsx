import { cn } from "@/lib/utils"

interface FooterProps {
    className?: string
}

const Footer = ({ className }: FooterProps) => {
    return (
        <div className={cn('text-center text-sm text-gray-500', className)}>
            <p>Hỗ trợ: <a href='mailto:support@example.com' className='text-blue-500 hover:underline'>support@example.com</a></p>
            <p>Copyright © 2025 <a href='https://example.com' className='text-blue-500 hover:underline'>Example</a>. All rights reserved.</p>
        </div>
    )
}

export default Footer
