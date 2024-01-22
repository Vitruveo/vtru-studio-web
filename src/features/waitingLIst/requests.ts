import { apiService } from '@/services/api';
import { WaitingItem, GetListApiRes, FindEmailInWaitingList } from './types';

export async function findWaitingList(): Promise<GetListApiRes> {
    const response = await apiService.get<WaitingItem[]>('/waitingList');

    return response;
}

export async function addWaitingList(data: any): Promise<any> {
    const response = await apiService.post('/waitingList', data);

    return response;
}

export async function addMultipleWaitingList(data: any): Promise<any> {
    const response = await apiService.post('/waitingList/multiple', data);

    return response;
}

export async function updateWaitingList(data: WaitingItem): Promise<any> {
    const response = await apiService.put(`/waitingList/${data._id}`, data);

    return response;
}

export async function deletWaitingList(id: string): Promise<any> {
    const response = await apiService.delete(`/waitingList/${id}`);

    return response;
}

export async function createAttemptInWaitingList(email: string): Promise<any> {
    const response = await apiService.post(`/waitingList/attempt`, { email });

    return response;
}

export async function updateAttemptInWaitingList(email: string): Promise<any> {
    const response = await apiService.put(`/waitingList/attempt/${email}`, { email });

    return response;
}

export async function findEmailInWaitingList(email: string): Promise<FindEmailInWaitingList> {
    const response = await apiService.get<boolean>(`/waitingList/attempt/${email}`);

    return response;
}
