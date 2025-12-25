'use client'

import { useSearchImages } from '@/shared/hooks/useSearchImages'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import ImageCard from './components/ImageCard'
import SearchInput from './components/SearchInput'
import { Skeleton } from '@/shared/ui/skeleton'
import { useInView } from 'react-intersection-observer'

function SearchPage() {
	const [query, setQuery] = useState('')
	const [value] = useDebounce(query, 1200)

	const {
		data,
		isLoading,
		isError,
		error,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useSearchImages(value)

	const isNotFound = !isLoading && data?.pages.length === 0 && value !== ''

	const { ref, inView } = useInView({
		threshold: 0.1,
		rootMargin: '0px',
		delay: 100,
	})

	useEffect(() => {
		if (!inView) return
		if (!hasNextPage) return

		fetchNextPage()
	}, [inView])

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

			{isError && (
				<div className='text-center text-red-400 text-2xl  mt-4'>
					Error: {error.message}
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6'>
				{isLoading &&
					Array.from({ length: 12 }).map((_, i) => (
						<Skeleton key={i} className='w-full h-80 mb-6' />
					))}

				{data?.pages.map(page =>
					page.results.map(img => <ImageCard key={img.id} img={img} />)
				)}
			</div>

			<div className='text-center'>
				{isNotFound && (
					<div className='text-center mt-10 flex flex-col items-center gap-2'>
						<span className='text-4xl'>🔭</span>
						<span className='text-2xl font-light text-gray-500'>
							No photos matched your search.
						</span>
						<p className='text-md text-gray-400 font-light'>
							Try different keywords
						</p>
					</div>
				)}
			</div>

			<div ref={ref} className='h-40 flex justify-center items-center'>
				{isFetchingNextPage && (
					<div className=' columns-1 sm:columns-2 lg:columns-3 mt-6'>
						<Skeleton className='w-full sm:h-100 h-70 flex flex-col mb-6' />
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchPage
