import { Skeleton } from '@/shared/ui/skeleton'

interface ImageSkeletonProps {
	skeletonLength: number
}

const ImageSkeleton = ({ skeletonLength }: ImageSkeletonProps) => {
	return Array.from({ length: skeletonLength }).map((_, i) => (
		<Skeleton key={i} className='w-full h-80 mb-6' />
	))
}

export default ImageSkeleton
