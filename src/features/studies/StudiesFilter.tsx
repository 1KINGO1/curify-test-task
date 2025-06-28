'use client'

import {Input} from '@/shared/components/ui/input';
import {useDebounce} from '@/shared/hooks/useDebounce';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

export function StudiesFilter() {
	const queryParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const [searchValue, setSearchValue] = useState(queryParams.get('search') ?? '');
	const debounceSearchValue = useDebounce(searchValue, 400);

	useEffect(() => {
		if (debounceSearchValue === '') {
			router.push(pathname);
			return;
		}

		if (debounceSearchValue === queryParams.get('search')) {
			return;
		}

		router.push(pathname + `?search=${encodeURIComponent(debounceSearchValue)}`);
	}, [debounceSearchValue]);

	return (
		<div>
			<Input
				placeholder="Type a condition to search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	)
}