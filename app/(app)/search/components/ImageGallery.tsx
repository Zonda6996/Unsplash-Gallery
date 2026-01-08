import { UnsplashSearchResponse } from '@/types/unsplash'
import ImageCard from './ImageCard'
import ImageSkeleton from './ImageSkeleton'
import clsx from 'clsx'

interface ImageGalleryProps {
	data?: { pages: UnsplashSearchResponse[] }
	isLoading: boolean
	className?: string
}

const ImageGallery = ({ isLoading, data, className }: ImageGalleryProps) => {
	return (
		<div className={className}>
			{isLoading && <ImageSkeleton skeletonLength={12} />}

			{data?.pages.map(page =>
				page.results.map(img => <ImageCard key={img.id} img={img} />)
			)}
		</div>
	)
}

export default ImageGallery
