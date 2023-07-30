import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '@/constants';
import * as APIs from '@/apis';
import * as Models from '@/models';
import * as Utils from '@/utils';
import classes from './page.module.scss';
import { Button } from '@/components';
import ArrowBack from '@/components/Icons/ArrowBack';
import clsx from 'clsx';


type Country = Omit<Models.Country, "borders"> & {
  borders: {
    alpha: string;
    name: string;
  }[];
};

async function getCountry(alpha: string) {
  const country = await APIs.countries.getOne({ alpha });
  const borders: Country["borders"] = [];

  if (country.borders) {
    for (const alpha of country.borders) {
      const name = (await APIs.countries.getName({ alpha })).name;
      borders.push({ name, alpha })
    }
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
    <div className={clsx('container', classes.root)}>

      <div className={classes.top}>
        <Link href={Utils.Route.generatePath(Routes.COUNTRIES)} passHref legacyBehavior>
          <Button icon={<ArrowBack />}>Back</Button>
        </Link>
      </div>

      <div className={classes.flag}>

        <div className={classes.imageWrapper}>
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

      <div className={classes.left}>
        <h2>{country.name}</h2>

        {React.Children.toArray(['nativeName', "population", "region", "subregion", "capital"].map(property => (
          <div className={classes.property}>
            <strong>{propertyTitle[property]}:</strong>
            <span>{country[property as CountryProperty]}</span>
          </div>
        )))}

      </div>


      <div className={classes.right}>
        <div className={classes.property}>
          <strong>Top Level Domain:</strong>
          <span>{country.topLevelDomain}</span>
        </div>
        <div className={classes.property}>
          <strong>Currencies:</strong>
          <span>{country.currencies.map(currency => currency.symbol).toString()}</span>
        </div>
        <div className={classes.property}>
          <strong>Languages:</strong>
          <span>{country.languages.map(lan => lan.name).toString()}</span>
        </div>
      </div>

      <div className={classes.bottom}>
        <strong>Border Countries:</strong>
        {React.Children.toArray(country.borders.map(border => (
          <Link href={Utils.Route.generatePath(Routes.COUNTRY, { alpha: border.alpha })} passHref legacyBehavior>
            <Button>{border.name}</Button>
          </Link>
        )))}
      </div>

    </div>
  )

}