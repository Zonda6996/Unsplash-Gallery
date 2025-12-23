import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers/providers'

const josefinSans = Josefin_Sans({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Unsplash Gallery',
	description: 'A simple gallery app using Unsplash API',
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${josefinSans.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
