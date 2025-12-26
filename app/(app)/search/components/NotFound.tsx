const NotFound = () => {
	return (
		<div className='text-center mt-10 flex flex-col items-center gap-2'>
			<span className='text-4xl'>🔭</span>
			<span className='text-2xl font-light text-gray-500'>
				No photos matched your search.
			</span>
			<p className='text-md text-gray-400 font-light'>Try different keywords</p>
		</div>
	)
}

export default NotFound
