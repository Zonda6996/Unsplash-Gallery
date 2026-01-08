'use client'

import { useSearchImages } from '@/shared/hooks/useSearchImages'
import ImageGallery from './search/components/ImageGallery'
import ErrorMessage from './search/components/ErrorMessage'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import ImageSkeleton from './search/components/ImageSkeleton'
import { useSearchParams } from 'next/navigation'
import { ButtonGroup } from '@/shared/ui/button-group'
import { Button } from '@/shared/ui/button'
import { Grid3x2Icon, LayoutDashboardIcon } from 'lucide-react'
import clsx from 'clsx'

export default function Home() {
	const [toggleLayout, setToggleLayout] = useState(true)
	const searchParams = useSearchParams()
	const category = searchParams.get('category') || ''

	const {
		data,
		isLoading,
		isError,
		error,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useSearchImages(category)

	const { ref, inView } = useInView({
		delay: 100,
	})

	console.log(toggleLayout)

	useEffect(() => {
		if (!inView) return
		if (!hasNextPage) return

		fetchNextPage()
	}, [inView, hasNextPage, fetchNextPage])

	return (
		<div className='flex flex-col  mt-4'>
			<h2 className='text-3xl text-center'>
				Welcome to Unsplash Gallery! Start by searching for images.
			</h2>

			<ButtonGroup className='self-end shadow-lg'>
				<Button onClick={() => setToggleLayout(true)}>
					<Grid3x2Icon />
				</Button>
				<Button onClick={() => setToggleLayout(false)}>
					<LayoutDashboardIcon />
				</Button>
			</ButtonGroup>

			{isError && <ErrorMessage error={error} />}

			<ImageGallery
				className={clsx(
					'mt-6 gap-6',
					toggleLayout
						? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
						: 'columns-1 sm:columns-2 lg:columns-3'
				)}
				data={data}
				isLoading={isLoading}
			/>

			<div ref={ref} className='h-1'>
				{isFetchingNextPage && (
					<div className='mt-6 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
						<ImageSkeleton skeletonLength={3} />
					</div>
				)}
			</div>
		</div>
	)
}
 