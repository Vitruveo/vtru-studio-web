import { APIResponse } from '../common/types';
import { StoresItem } from './types';

import Image1 from '../../../public/images/temp/1729105555923.png';
import Image2 from '../../../public/images/temp/1729105587915.png';

export async function getStores(): Promise<APIResponse<StoresItem[]>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 'api',
                message: 'Success',
                transaction: '123',
                data: [
                    {
                        id: '1',
                        name: 'Horizon Gallery',
                        status: 'Active',
                        image: Image1 as unknown as string,
                    },
                    {
                        id: '2',
                        name: 'Red Gallery',
                        status: 'Draft',
                        image: Image2 as unknown as string,
                    },
                ],
            });
        }, 2000);
    });
}
