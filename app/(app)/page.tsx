'use client'

import { useSearchImages } from '@/shared/hooks/useSearchImages'
import ImageGallery from './search/components/ImageGallery'
import ErrorMessage from './search/components/ErrorMessage'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import ImageSkeleton from './search/components/ImageSkeleton'

export default function Home() {
	const {
		data,
		isLoading,
		isError,
		error,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useSearchImages('')

	const { ref, inView } = useInView({
		delay: 100,
	})

	useEffect(() => {
		if (!inView) return
		if (!hasNextPage) return

		fetchNextPage()
	}, [inView, hasNextPage, fetchNextPage])

	return (
		<div className=' mt-4'>
			<h2 className='text-3xl text-center'>
				Welcome to Unsplash Gallery! Start by searching for images.
			</h2>

			{isError && <ErrorMessage error={error} />}

			<ImageGallery data={data} isLoading={isLoading} />

			<div ref={ref} className='h-1'>
				{isFetchingNextPage && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6'>
						<ImageSkeleton skeletonLength={3} />
					</div>
				)}
			</div>
		</div>
	)
}
