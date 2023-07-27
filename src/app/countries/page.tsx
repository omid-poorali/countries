import React from 'react';
import * as APIs from '@/apis';

async function getCountries() {
  return await APIs.countries.getAll();
}

export default async function Page() {
  const countries = await getCountries()

  return (
    <ul>
      {React.Children.toArray(countries.map(country => (
        <li>
          {country.name}
        </li>
      )))}
    </ul>
  )

}