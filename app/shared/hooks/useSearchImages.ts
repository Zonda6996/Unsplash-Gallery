import { UnsplashSearchResponse } from '@/types/unsplash'
import { useQuery } from '@tanstack/react-query'

const fetchImages = async (query: string): Promise<UnsplashSearchResponse> => {
	const response = await fetch(
		`https://api.unsplash.com/search/photos?query=${query}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
			},
		}
	)

	if (!response.ok) {
		throw new Error('Ошибка при получении фотографий')
	}

	return response.json()
}

export const useSearchImages = (searchQuery: string) => {
	return useQuery<UnsplashSearchResponse, Error>({
		queryKey: ['images', searchQuery],

		queryFn: () => fetchImages(searchQuery),

		enabled: !!searchQuery,
	})
}
