import { UnsplashSearchResponse } from '@/types/unsplash'
import ImageCard from './ImageCard'
import ImageSkeleton from './ImageSkeleton'

interface ImageGalleryProps {
	data?: { pages: UnsplashSearchResponse[] }
	isLoading: boolean
}

const ImageGallery = ({ isLoading, data }: ImageGalleryProps) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6'>
			{isLoading && <ImageSkeleton skeletonLength={12} />}

			{data?.pages.map(page =>
				page.results.map(img => <ImageCard key={img.id} img={img} />)
			)}
		</div>
	)
}

export default ImageGallery
