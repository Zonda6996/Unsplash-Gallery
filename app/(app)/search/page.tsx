'use client'

import { useSearchImages } from '@/shared/hooks/useSearchImages'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import SearchInput from './components/SearchInput'
import { useInView } from 'react-intersection-observer'
import ErrorMessage from './components/ErrorMessage'
import NotFound from './components/NotFound'
import ImageGallery from './components/ImageGallery'
import ImageSkeleton from './components/ImageSkeleton'
import { ButtonGroup } from '@/shared/ui/button-group'
import { Grid3x2Icon, LayoutDashboardIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import clsx from 'clsx'

function SearchPage() {
	const [toggleLayout, setToggleLayout] = useState(true)
	const [query, setQuery] = useState('')
	const [debouncedQuery] = useDebounce(query, 1200)

	const {
		data,
		isLoading,
		isError,
		error,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useSearchImages(debouncedQuery)

	const isNotFound =
		!isLoading &&
		data?.pages.every(page => page.results.length === 0) &&
		debouncedQuery !== ''

	const { ref, inView } = useInView({
		delay: 100,
	})

	useEffect(() => {
		if (!inView) return
		if (!hasNextPage) return

		fetchNextPage()
	}, [inView, hasNextPage, fetchNextPage])

	return (
		<div className='flex flex-col'>
			<div className='flex flex-col items-center'>
				<div className='w-full max-w-80 flex flex-col font-light text-xl mb-5 tracking-widest'>
					<span className='self-start'>find your vision </span>
					<span className='self-end'>search, discover, create.</span>
				</div>
				<SearchInput value={query} onChange={e => setQuery(e.target.value)} />
			</div>

			<ButtonGroup className='self-end shadow-lg'>
				<Button onClick={() => setToggleLayout(true)}>
					<Grid3x2Icon />
				</Button>
				<Button onClick={() => setToggleLayout(false)}>
					<LayoutDashboardIcon />
				</Button>
			</ButtonGroup>

			{isError && <ErrorMessage error={error} />}
			{isNotFound && <NotFound />}

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
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6'>
						<ImageSkeleton skeletonLength={3} />
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchPage
