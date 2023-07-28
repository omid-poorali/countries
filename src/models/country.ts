export type Country = {
    name: string;
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