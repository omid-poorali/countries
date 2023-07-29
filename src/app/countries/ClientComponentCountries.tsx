"use client"

import React, { useEffect, useState } from 'react';
import { CountryCard } from '@/components';
import Link from 'next/link';
import { Routes } from '@/constants';
import * as APIs from '@/apis';
import * as Utils from '@/utils';
import * as Models from '@/models';

type PropsType = {
  region?: string;
  query?: string;
}


export const ClientComponentCountries = (props: PropsType) => {

  const { query, region } = props;
  const [countries, setCountries] = useState<Models.CountryListItem[]>([]);

  useEffect(() => {
    APIs.countries.getAll().then(result => {
      let filtered = result;
      if (region) {
        filtered = filtered.filter(country => country.region === region);
      }
      if (query) {
        filtered = filtered.filter(country => (Utils.String.hasAllCharsWithOrder(country.name.toLowerCase(), query.toLowerCase())
          || `${country.population}`.toLowerCase().includes(query)));
      }

      setCountries(() => filtered);

    })

  }, [query, region]);

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