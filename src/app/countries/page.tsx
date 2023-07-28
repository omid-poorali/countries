import React from 'react';
import * as APIs from '@/apis';
import { CountryCard } from '@/components';

async function getCountries() {
  return await APIs.countries.getAll();
}

export default async function Page() {
  const countries = await getCountries()

  return (
    <div className="container">
      <ul className="row gap-1 justify-center">
        {React.Children.toArray(countries.map(country => (
          <li className=''>
            <CountryCard
              flag={country.flags.png}
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          </li>
        )))}
      </ul>
    </div>
  )

}