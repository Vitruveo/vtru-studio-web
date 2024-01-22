import { APIResponse } from '../common/types';

export interface WaitingItem {
    _id: string;
    email: string;
    framework: {
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        updatedBy: string;
    };
}

export type GetListApiRes = APIResponse<WaitingItem[]>;
export type FindEmailInWaitingList = APIResponse<boolean>;
