"use client"

import { InputBase } from '@/components';
import { useQueryParam } from '@/hooks';


export default function Page() {

  const [searchTerm, setSearchTerm] = useQueryParam('query');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value)
  };

  return (
    <InputBase
      name="query"
      defaultValue={searchTerm}
      onChange={handleSearchInputChange} />
  )

}