import * as Models from 'models';

export type GetAllResponse = Models.CountryListItem[];

//---------------------------------------------------------

export type GetOneRequest = {
    alpha: string;
};

export type GetOneResponse = Models.Country;

//---------------------------------------------------------

export type GetNameRequest = {
    alpha: string;
};

export type GetNameResponse = Pick<Models.Country, "name">;