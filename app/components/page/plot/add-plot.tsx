import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { type Plot } from './columns'

const cropOptions = [
    { value: 'lua', label: 'Lúa' },
    { value: 'ngo', label: 'Ngô' },
    { value: 'rau_cai', label: 'Rau cải' },
    { value: 'ca_chua', label: 'Cà chua' },
    { value: 'dua_hau', label: 'Dưa hấu' },
    { value: 'khoai_tay', label: 'Khoai tây' },
    { value: 'ot', label: 'Ớt' },
    { value: 'hanh_la', label: 'Hành lá' },
    { value: 'dau_xanh', label: 'Đậu xanh' },
    { value: 'bap_cai', label: 'Bắp cải' },
    { value: 'ca_rot', label: 'Cà rốt' },
    { value: 'su_hao', label: 'Su hào' },
    { value: 'cai_thao', label: 'Cải thảo' },
    { value: 'rau_muong', label: 'Rau muống' },
    { value: 'rau_dang', label: 'Rau đắng' }
]

const locationOptions = [
    { value: 'khu_vuc_1', label: 'Khu vực 1' },
    { value: 'khu_vuc_2', label: 'Khu vực 2' },
    { value: 'khu_vuc_3', label: 'Khu vực 3' },
    { value: 'khu_vuc_4', label: 'Khu vực 4' },
    { value: 'khu_vuc_5', label: 'Khu vực 5' },
    { value: 'khu_vuc_6', label: 'Khu vực 6' },
    { value: 'khu_vuc_7', label: 'Khu vực 7' },
    { value: 'khu_vuc_8', label: 'Khu vực 8' }
]

const statusOptions = [
    { value: 'currently_planting', label: 'Đang trồng' },
    { value: 'currently_sowing', label: 'Đang ươm' },
    { value: 'waiting', label: 'Đang chờ' }
]

interface FormData {
    name: string
    crop: string
    area: string
    status: string
    startDate: string
    expectedHarvest: string
    location: string
    description: string
}

const AddPlot = () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        crop: '',
        area: '',
        status: 'waiting',
        startDate: '',
        expectedHarvest: '',
        location: '',
        description: ''
    })

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Validate required fields
            if (!formData.name || !formData.crop || !formData.area || !formData.location) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc')
                return
            }

            // Create new plot data
            const newPlot: Omit<Plot, 'id'> = {
                name: formData.name,
                crop: cropOptions.find((c) => c.value === formData.crop)?.label || formData.crop,
                area: parseInt(formData.area) || 0,
                status: formData.status as Plot['status'],
                startDate: formData.startDate,
                expectedHarvest: formData.expectedHarvest,
                location: locationOptions.find((l) => l.value === formData.location)?.label || formData.location
            }

            // Here you would typically send the data to your API
            console.log('Adding new plot:', newPlot)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Reset form and close dialog
            setFormData({
                name: '',
                crop: '',
                area: '',
                status: 'waiting',
                startDate: '',
                expectedHarvest: '',
                location: '',
                description: ''
            })
            setOpen(false)

            // Show success message
            alert('Thêm lô trồng thành công!')
        } catch (error) {
            console.error('Error adding plot:', error)
            alert('Có lỗi xảy ra khi thêm lô trồng')
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            crop: '',
            area: '',
            status: 'waiting',
            startDate: '',
            expectedHarvest: '',
            location: '',
            description: ''
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='rounded-full gap-x-1'>
                    <Plus className='size-4' />
                    Tạo mới
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Thêm lô trồng mới</DialogTitle>
                    <DialogDescription>
                        Điền thông tin chi tiết về lô trồng mới. Các trường có dấu * là bắt buộc.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Tên lô *</Label>
                            <Input
                                id='name'
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder='Ví dụ: Lô A1'
                                required
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='crop'>Loại cây trồng *</Label>
                            <Select
                                value={formData.crop}
                                onValueChange={(value: string) => handleInputChange('crop', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Chọn loại cây trồng' />
                                </SelectTrigger>
                                <SelectContent>
                                    {cropOptions.map((crop) => (
                                        <SelectItem key={crop.value} value={crop.value}>
                                            {crop.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='area'>Diện tích (m²) *</Label>
                            <Input
                                id='area'
                                type='number'
                                value={formData.area}
                                onChange={(e) => handleInputChange('area', e.target.value)}
                                placeholder='Ví dụ: 1000'
                                min='1'
                                required
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='location'>Vị trí *</Label>
                            <Select
                                value={formData.location}
                                onValueChange={(value: string) => handleInputChange('location', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Chọn vị trí' />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationOptions.map((location) => (
                                        <SelectItem key={location.value} value={location.value}>
                                            {location.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='startDate'>Ngày bắt đầu</Label>
                            <Input
                                id='startDate'
                                type='date'
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='expectedHarvest'>Dự kiến thu hoạch</Label>
                            <Input
                                id='expectedHarvest'
                                type='date'
                                value={formData.expectedHarvest}
                                onChange={(e) => handleInputChange('expectedHarvest', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='status'>Trạng thái</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: string) => handleInputChange('status', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Chọn trạng thái' />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='description'>Mô tả</Label>
                        <Textarea
                            id='description'
                            value={formData.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                handleInputChange('description', e.target.value)
                            }
                            placeholder='Mô tả chi tiết về lô trồng, ghi chú, v.v.'
                            rows={3}
                        />
                    </div>

                    <DialogFooter className='gap-2'>
                        <Button type='button' variant='outline' onClick={resetForm} disabled={loading}>
                            Làm mới
                        </Button>
                        <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={loading}>
                            Hủy
                        </Button>
                        <Button type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Đang thêm...
                                </>
                            ) : (
                                'Thêm lô trồng'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPlot
