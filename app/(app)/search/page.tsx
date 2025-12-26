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

function SearchPage() {
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

	console.log(data)

	return (
		<div>
			<div className='flex flex-col items-center'>
				<div className='w-full max-w-80 flex flex-col font-light text-xl mb-5 tracking-widest'>
					<span className='self-start'>find your vision </span>
					<span className='self-end'>search, discover, create.</span>
				</div>
				<SearchInput value={query} onChange={e => setQuery(e.target.value)} />
			</div>

			{isError && <ErrorMessage error={error} />}
			{isNotFound && <NotFound />}

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

export default SearchPage
