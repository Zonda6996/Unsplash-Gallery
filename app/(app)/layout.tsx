import Header from '@/components/Header.tsx/Header'
import React from 'react'

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Header />
			<main className='container mx-auto flex flex-col px-4'>{children}</main>
		</>
	)
}
