import request from '../request';

import {
    GetAllResponse,
    GetNameRequest,
    GetNameResponse,
    GetOneRequest,
    GetOneResponse
} from './contract';

export const getAll = async () => request.get<GetAllResponse>('/v2/all?fields=name,population,region,capital,flags,alpha3Code');

export const getOne = async (payload: GetOneRequest) => request.get<GetOneResponse>(`/v2/alpha/${payload.alpha}`);

export const getName = async (payload: GetNameRequest) => request.get<GetNameResponse>(`/v2/alpha/${payload.alpha}?fields=name`);