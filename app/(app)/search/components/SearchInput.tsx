import { Input } from '@/shared/ui/input'
import { SearchIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

interface SearchInputProps {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ onChange, value }: SearchInputProps) => {
	return (
		<div className='relative w-full max-w-1/2'>
			<Input
				className='w-full bg-gray-100 py-5 pr-10'
				type='text'
				placeholder='Search photo and illustrations'
				value={value}
				onChange={onChange}
			/>
			<SearchIcon
				className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none'
				width={20}
			/>
		</div>
	)
}

export default SearchInput
