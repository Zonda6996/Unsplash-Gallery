export const ROUTES = {
	HOME: '/',
	SEARCH: '/search',
} as const

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]
