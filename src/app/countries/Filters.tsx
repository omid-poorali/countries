"use client"

import { InputBase } from '@/components';
import { useQueryParam } from '@/hooks';
import classes from './page.module.scss';
import { Dropdown } from '@/components/Dropdown';

const regions = [
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania"
]

export const Filters = ({
    children,
}: {
    children: React.ReactNode
}) => {

    const [searchTerm, setSearchTerm] = useQueryParam('query');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value)
    };

    return (
        <div className='container'>
            <div className={classes.filters}>

                <InputBase
                    name="query"
                    placeholder='Search for a country...'
                    defaultValue={searchTerm}
                    onChange={handleSearchInputChange} />

                <Dropdown
                    placeholder='Filter by Region'
                    options={regions.map(region => ({ label: region, value: region }))}
                />
            </div>

            {children}

        </div>
    )

}