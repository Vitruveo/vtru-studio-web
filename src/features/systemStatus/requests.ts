import axios, { AxiosResponse } from 'axios';
import { SystemStatusType } from './types';
import { SYSTEM_STATUS_JSON } from '@/constants/vitruveo';

export function loadSystemStatus(): Promise<AxiosResponse<SystemStatusType>> {
    return axios.get(SYSTEM_STATUS_JSON);
}
