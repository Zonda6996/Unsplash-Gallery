'use client'

import { useSearchImages } from '@/shared/hooks/useSearchImages'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import ImageCard from './components/ImageCard'
import SearchInput from './components/SearchInput'

function SearchPage() {
	const [query, setQuery] = useState('')
	const [value] = useDebounce(query, 1200)

	const { data, isLoading, isError, error } = useSearchImages(value)

	const isNotFound = !isLoading && data?.results.length === 0 && value !== ''

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

			{isLoading && (
				<div className='text-center text-2xl font-semibold mt-4'>
					Loading...
				</div>
			)}

			{isError && (
				<div className='text-center text-red-400 text-2xl  mt-4'>
					Error: {error.message}
				</div>
			)}

			<div className='columns-1 sm:columns-2 lg:columns-3 my-6'>
				{data?.results.map(img => (
					<ImageCard key={img.id} img={img} />
				))}
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
		</div>
	)
}

export default SearchPage
