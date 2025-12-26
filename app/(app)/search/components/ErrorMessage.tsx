import React from 'react'

interface ErrorMessageProps {
	error: Error
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
	return (
		<div className='text-center text-red-400 text-2xl  mt-4'>
			Error: {error.message}
		</div>
	)
}

export default ErrorMessage
