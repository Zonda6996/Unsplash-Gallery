import { UnsplashPhoto, UnsplashSearchResponse } from '@/types/unsplash'
import { useInfiniteQuery } from '@tanstack/react-query'

// const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const fetchImages = async ({
	query,
	pageParam = 1,
}: {
	query: string
	pageParam: number
}): Promise<UnsplashSearchResponse> => {
	// await delay(300000)

	const url = query
		? `https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=${pageParam}`
		: `https://api.unsplash.com/photos?&per_page=20&page=${pageParam}`

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
		},
	})

	if (!response.ok) {
		throw new Error('Error receiving photos')
	}

	const rawData = await response.json()

	if (query) {
		return rawData as UnsplashSearchResponse
	} else {
		const images = rawData as UnsplashPhoto[]
		return {
			results: images,
			total: 10000,
			total_pages: 500,
			nextPage: pageParam,
		}
	}
}

export const useSearchImages = (searchQuery: string) => {
	return useInfiniteQuery<UnsplashSearchResponse, Error>({
		queryKey: ['images', searchQuery || 'default'],
		initialPageParam: 1,

		queryFn: ({ pageParam }) =>
			fetchImages({ query: searchQuery, pageParam: pageParam as number }),

		getNextPageParam: (lastPage, pages) => {
			const nextPage = pages.length + 1

			if (nextPage > lastPage.total_pages) {
				return undefined
			}

			return nextPage
		},
	})
}
