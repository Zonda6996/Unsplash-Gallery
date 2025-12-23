export interface UnsplashPhoto {
	id: string
	urls: {
		regular: string
		small: string
	}
	alt_description: string
	user: {
		name: string

		profile_image: {
			medium: string
		}
	}
}

export interface UnsplashSearchResponse {
	total: number
	total_pages: number
	results: UnsplashPhoto[]
}
