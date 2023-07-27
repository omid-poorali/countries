import request from '../request';

import { GetAllResponse } from './contract';

export const getAll = async () => request.get<GetAllResponse>('/v2/all');