import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '@/constants';
import * as APIs from '@/apis';
import * as Models from '@/models';
import * as Utils from '@/utils';
import classes from './page.module.scss';


type Country = Omit<Models.Country, "borders"> & {
  borders: {
    alpha: string;
    name: string;
  }[];
};

async function getCountry(alpha: string) {
  const country = await APIs.countries.getOne({ alpha });
  const borders: Country["borders"] = [];

  for (const alpha of country.borders) {
    const name = (await APIs.countries.getName({ alpha })).name;
    borders.push({ name, alpha })
  }

  return {
    ...country,
    borders
  } as Country;
}

type CountryProperty = keyof Pick<Models.Country, "nativeName" | "population" | "region" | "subregion" | "capital">;

const propertyTitle: { [key: string]: string } = {
  nativeName: "Native Name",
  population: "Population",
  region: "Region",
  subregion: "Sub Region",
  capital: "Capital"
}

export default async function Page({ params }: { params: { alpha: string } }) {
  const country = await getCountry(params.alpha);


  return (
    <div className={classes.root}>
      <div className={classes.flagSection}>
        <div className={classes.flagWrapper}>
          <Image
            src={country.flags.png}
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'fill'
            }}
            alt={country.name}
          />
        </div>
      </div>
      <div className={classes.info}>
        <h2>{country.name}</h2>
        <div className={classes.section}>
          {React.Children.toArray(['nativeName', "population", "region", "subregion", "capital"].map(property => (
            <div className={classes.property}>
              <h3>{propertyTitle[property]}:</h3>
              <span>{country[property as CountryProperty]}</span>
            </div>
          )))}
        </div>
        <div className={classes.section}>
          <div className={classes.property}>
            <h3>Top Level Domain:</h3>
            <span>{country.topLevelDomain}</span>
          </div>
          <div className={classes.property}>
            <h3>Currencies:</h3>
            <span>{country.currencies.map(currency => currency.symbol).toString()}</span>
          </div>
          <div className={classes.property}>
            <h3>Languages:</h3>
            <span>{country.languages.map(lan => lan.name).toString()}</span>
          </div>
        </div>

        <div className={classes.borderCountries}>
          <h3>Border Countries:</h3>
          {React.Children.toArray(country.borders.map(border => (
            <Link href={Utils.Route.generatePath(Routes.COUNTRY, { alpha: border.alpha })}>{border.name}</Link>
          )))}
        </div>
      </div>
    </div>
  )

}