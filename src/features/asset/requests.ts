import axios from 'axios';
import FormDataUpload from 'form-data';
import { AssetStorageReq } from './types';

export async function assetStorage({ file, url }: AssetStorageReq): Promise<any> {
    const formDataUpload = new FormDataUpload();
    formDataUpload.append('file', file);

    const res = await axios.put(url, formDataUpload, {
        // headers: formDataUpload.getHeaders(),
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
            console.log(percentCompleted);
        },
    });

    return res;
}
