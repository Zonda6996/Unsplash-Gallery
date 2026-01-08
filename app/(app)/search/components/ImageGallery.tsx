import { UnsplashSearchResponse } from '@/types/unsplash'
import ImageCard from './ImageCard'
import ImageSkeleton from './ImageSkeleton'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import { BookmarkIcon, DownloadCloudIcon } from 'lucide-react'
import { Separator } from '@/shared/ui/separator'
import { downloadImage } from '@/shared/helpers/downloadImage'
import Link from 'next/link'

interface ImageGalleryProps {
	data?: { pages: UnsplashSearchResponse[] }
	isLoading: boolean
	className?: string
}

const ImageGallery = ({ isLoading, data, className }: ImageGalleryProps) => {
	return (
		<div className={className}>
			{isLoading && <ImageSkeleton skeletonLength={12} />}

			{data?.pages.map(page =>
				page.results.map(img => (
					<Dialog key={img.id}>
						<DialogTrigger className='flex'>
							<ImageCard img={img} />
						</DialogTrigger>
						<DialogContent className='sm:max-w-250 max-h-[90vh] overflow-y-auto'>
							<DialogHeader className='flex flex-row justify-between mt-2 items-center '>
								<div className='flex items-center gap-2'>
									<Image
										className='rounded-full'
										src={img.user.profile_image.medium}
										alt='User Avatar'
										width={40}
										height={40}
									/>
									<DialogTitle className=' text-lg'>
										{img.user.name}
									</DialogTitle>
								</div>
								<div className='flex items-center gap-3'>
									<Button size={'icon'} variant={'outline'}>
										<BookmarkIcon className='' />
									</Button>
									<Button
										variant={'outline'}
										onClick={() =>
											downloadImage(img.urls.full, `unsplash-${img.id}`)
										}
									>
										Download
										<Separator className='bg-black ' orientation='vertical' />
										<DownloadCloudIcon />
									</Button>
								</div>
							</DialogHeader>
							<div className='flex flex-col justify-center'>
								<Image
									src={img.urls.regular}
									alt={img.alt_description}
									width={800}
									height={600}
									className='w-auto max-h-[75vh] object-contain'
									unoptimized
								/>
							</div>
							<DialogFooter className='flex flex-col! gap-0!'>
								<p className='text-gray-500 font-light'>Likes</p>
								<p>{img.likes}</p>
								<Button className='mt-2'>
									<Link target='_blank' href={img.links.html}>
										Open on Unsplash
									</Link>
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				))
			)}
		</div>
	)
}

export default ImageGallery
