import { UnsplashPhoto } from '@/types/unsplash'
import Image from 'next/image'

interface ImageCardProps {
	img: UnsplashPhoto
}

const ImageCard = ({ img }: ImageCardProps) => {
	return (
		<div
			style={{ backgroundColor: img.color }}
			className='mb-6 break-inside-avoid relative group cursor-pointer'
		>
			<Image
				className='w-full h-auto object-cover'
				src={img.urls.regular}
				alt={img.alt_description || `Photo by ${img.user.name} on Unsplash`}
				width={500}
				height={750}
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			/>

			<div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none'></div>

			<div className='flex gap-2 items-center absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z10'>
				<Image
					className='rounded-full'
					src={img.user.profile_image.medium}
					alt='User Avatar'
					width={32}
					height={32}
				/>
				<span className='text-white'>{img.user.name}</span>
			</div>
		</div>
	)
}

export default ImageCard
