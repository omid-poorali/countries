"use client"

import { useQueryParam } from '@/hooks';
import classes from './Filters.module.scss';
import { Dropdown, InputText } from '@/components';
import SerachIcon from '@/components/Icons/Search';
import { ClientComponentCountries } from './ClientComponentCountries';

const regions = [
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania"
]

export const Filters = ({
    children,
}: {
    children: React.ReactNode
}) => {

    const [query, setQuery] = useQueryParam('query');
    const [region, setRegion] = useQueryParam('region');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setQuery(value)
    };

    const handleRegionInputChange = (value: string) => {
        setRegion(value)
    };

    const renderCountries = () => {
        if (query || region) {
            return <ClientComponentCountries region={region} query={query} />
        }
        return children
    }

    return (
        <div className='container'>
            <div className={classes.filters}>

                <InputText
                    startAdornment={<SerachIcon />}
                    className={classes.searchBar}
                    name="query"
                    placeholder='Search for a country...'
                    defaultValue={query}
                    onChange={handleSearchInputChange} />

                <Dropdown
                    name='region'
                    placeholder='Filter by Region'
                    value={region}
                    options={regions.map(region => ({ label: region, value: region }))}
                    onChange={event => handleRegionInputChange(event.value)}
                />
            </div>

            {renderCountries()}

        </div>
    )

}