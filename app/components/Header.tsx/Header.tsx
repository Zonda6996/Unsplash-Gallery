'use client'

import { CATEGORIES } from '@/shared/const/categories'
import { ROUTES } from '@/shared/routes/routes'
import { Button } from '@/shared/ui/button'
import clsx from 'clsx'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function Header() {
	const searchParams = useSearchParams()
	const categoryParams = searchParams.get('category')

	return (
		<header className=' bg-gray-100 m-4 border border-black/10 rounded-lg shadow-lg'>
			<nav className='flex justify-between max-w-400 mx-auto py-4 px-2 items-center'>
				<div className='flex justify-between items-center'>
					<Link
						href={ROUTES.HOME}
						className='flex flex-col text-2xl font-bold hover:text-black/60 leading-tight'
					>
						<span>Unsplash</span>
						<span>Gallery</span>
					</Link>
				</div>
				<ul className='flex gap-6 items-center text-lgb mx-3'>
					{CATEGORIES.map(category => (
						<li key={category.value}>
							<Link
								href={`/?category=${category.value}`}
								className={clsx(
									'text-gray-600 relative pb-2 transition-colors',
									'after:absolute after:left-0 after:-bottom-8 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform',
									categoryParams === category.value
										? 'text-black! after:scale-x-100'
										: 'hover:after:scale-x-100 hover:text-black'
								)}
							>
								{category.label}
							</Link>
						</li>
					))}
				</ul>
				<Button asChild>
					<Link href={ROUTES.SEARCH}>Search Photos</Link>
				</Button>
			</nav>
		</header>
	)
}

export default Header
