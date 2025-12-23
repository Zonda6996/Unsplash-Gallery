import { ROUTES } from '@/shared/routes/routes'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

function Header() {
	return (
		<header className=' bg-gray-100 m-4 border border-black/10 rounded-lg shadow-lg'>
			<nav className='flex justify-between max-w-400 mx-auto py-4 px-2 items-center'>
				<div className='flex justify-between w-1/3'>
					<div>
						<Link
							href={ROUTES.HOME}
							className='flex flex-col text-2xl font-bold hover:text-black/60 leading-tight'
						>
							<span>Unsplash</span>
							<span>Gallery</span>
						</Link>
					</div>
					<ul className='flex gap-6 items-center font-semibold text-lg bg-gray-200/35 px-4 py-2 rounded-lg'>
						<li className='hover:underline'>
							<Link href={ROUTES.HOME}>Home</Link>
						</li>
						<li className='hover:underline'>
							<Link href={ROUTES.SEARCH}>Search</Link>
						</li>
					</ul>
				</div>
				<Button asChild>
					<Link href={ROUTES.SEARCH}>Search Photos</Link>
				</Button>
			</nav>
		</header>
	)
}

export default Header
