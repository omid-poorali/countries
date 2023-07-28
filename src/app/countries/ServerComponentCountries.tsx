import React from 'react';
import { CountryCard } from '@/components';
import Link from 'next/link';
import { Routes } from '@/constants';
import * as APIs from '@/apis';
import * as Utils from '@/utils';


async function getCountries() {
  return await APIs.countries.getAll();
}

export default async function ServerComponentCountries() {

  const countries = await getCountries();

  return (
    <ul className="row gap-3 justify-center">
      {React.Children.toArray(countries.map(country => (
        <li>
          <Link href={Utils.Route.generatePath(Routes.COUNTRY, { alpha: country.alpha3Code })}>
            <CountryCard
              flag={country.flags.png}
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          </Link>
        </li>
      )))}
    </ul>
  )

}