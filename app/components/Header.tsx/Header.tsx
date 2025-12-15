import { ROUTES } from '@/shared/routes/routes'
import Link from 'next/link'

function Header() {
	return (
		<header className='container mx-auto bg-gray-100 mt-4 rounded-lg shadow-lg'>
			<nav className='flex justify-between'>
				<div>
					<div className='p-4 text-2xl font-bold'>
						Unsplash <br /> Gallery
					</div>
				</div>
				<ul className='flex gap-4 items-center font-semibold text-lg'>
					<li className='hover:underline'>
						<Link href={ROUTES.HOME}>Home</Link>
					</li>
					<li className='hover:underline'>
						<Link href={ROUTES.SEARCH}>Search</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
