import React from 'react';
import * as APIs from '@/apis';
import { CountryCard } from '@/components';
import classes from './page.module.scss';

async function getCountries() {
  return await APIs.countries.getAll();
}

export default async function Page() {
  const countries = await getCountries()

  return (
    <ul className={classes.root}>
      {React.Children.toArray(countries.map(country => (
        <li>
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
  )

}