import * as Models from 'models';

export type GetAllResponse = Pick<Models.Country, "name" | "population" | "region" | "capital" | "flags">[];

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