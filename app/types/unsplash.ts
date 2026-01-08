export interface UnsplashPhoto {
	id: string
	urls: {
		regular: string
		small: string
		full: string
	}
	alt_description: string
	likes: number
	links: {
		download: string
		html: string
	}
	user: {
		name: string

		profile_image: {
			medium: string
		}
	}
	color: string
}

export interface UnsplashSearchResponse {
	total: number
	total_pages: number
	results: UnsplashPhoto[]
	nextPage: number
}
