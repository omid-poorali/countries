export type Country = {
    name: string;
    alpha3Code: string;
    capital: string;
    nativeName: string;
    population: number;
    subregion: string;
    region: string;
    topLevelDomain: string[];
    currencies: {
        code: string;
        name: string;
        symbol: string;
    }[];
    languages: {
        name: string;
    }[];
    borders: string[];
    flags: {
        png: string;
    }
}

export type CountryListItem = Pick<Country, "name" | "population" | "region" | "capital" | "flags" | "alpha3Code">;