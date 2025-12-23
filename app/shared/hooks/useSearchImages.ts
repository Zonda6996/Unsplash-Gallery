import { UnsplashPhoto, UnsplashSearchResponse } from '@/types/unsplash'
import { useQuery } from '@tanstack/react-query'

const fetchImages = async (query: string): Promise<UnsplashSearchResponse> => {
	const url = query
		? `https://api.unsplash.com/search/photos?query=${query}&per_page=20`
		: `https://api.unsplash.com/photos?&per_page=20`

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
			total: images.length,
			total_pages: 1,
		}
	}
}

export const useSearchImages = (searchQuery: string) => {
	return useQuery<UnsplashSearchResponse, Error>({
		queryKey: ['images', searchQuery || 'default'],

		queryFn: () => fetchImages(searchQuery),
	})
}
