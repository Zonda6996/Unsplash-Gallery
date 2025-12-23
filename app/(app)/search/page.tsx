'use client'

import { useSearchImages } from '@/shared/hooks/useSearchImages'
import { Input } from '@/shared/ui/input'
import Image from 'next/image'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

function SearchPage() {
	const [query, setQuery] = useState('audi')
	const [value] = useDebounce(query, 1200)

	const { data, isLoading, isError, error } = useSearchImages(value)

	console.log(data)

	return (
		<div>
			<div className='flex flex-col items-center'>
				<Input
					className='max-w-1/2 bg-gray-100 py-5'
					type='text'
					placeholder='Search photo and illustrations'
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>
			</div>
			{isLoading && (
				<div className='text-center text-2xl font-semibold mt-4'>
					Загрузка...
				</div>
			)}
			<div className='columns-1 sm:columns-2 lg:columns-3 my-6'>
				{data?.results.map(img => (
					<div
						className='mb-6 break-inside-avoid relative group cursor-pointer'
						key={img.id}
					>
						<Image
							className='w-full h-auto object-cover'
							src={img.urls.regular}
							alt={img.alt_description}
							width={500}
							height={750}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>

						<div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none'></div>

						<div className='flex gap-2 items-center absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z10'>
							<Image
								className='rounded-full'
								src={img.user.profile_image.medium}
								alt='User Avatar'
								width={32}
								height={32}
							/>
							<span className='text-white'>{img.user.name}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SearchPage
