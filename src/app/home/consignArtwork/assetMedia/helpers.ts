import { Definition, FormatsMedia } from './types';

export const mediaConfigs = {
    landscape: {
        display: {
            width: 3840,
            height: 2160,
            ppi: 72,
            sizeMB: {
                image: 10,
                video: 100,
            },
            required: true,
        },
        exhibition: {
            width: 3000,
            height: 2000,
            ppi: 72,
            sizeMB: {
                image: 10,
                video: 100,
            },
            required: true,
        },
        preview: {
            width: 2000,
            height: 2000,
            ppi: 72,
            sizeMB: {
                image: 0.25,
                video: 1,
            },
            required: true,
        },
        print: {
            width: 12000,
            height: 8000,
            ppi: 300,
            sizeMB: {
                image: 500,
                video: 0,
            },
            required: false,
        },
    },
    square: {
        display: {
            width: 3840,
            height: 3840,
            ppi: 72,
            sizeMB: {
                image: 10,
                video: 100,
            },
            required: true,
        },
        exhibition: {
            width: 3000,
            height: 3000,
            ppi: 72,
            sizeMB: {
                image: 10,
                video: 100,
            },
            required: true,
        },
        preview: {
            width: 2000,
            height: 2000,
            ppi: 72,
            sizeMB: {
                image: 0.244,
                video: 1,
            },
            required: true,
        },
        print: {
            width: 12000,
            height: 12000,
            ppi: 300,
            sizeMB: {
                image: 500,
                video: 0,
            },
            required: false,
        },
    },
    portrait: {
        display: {
            width: 2160,
            height: 3840,
            ppi: 72,
            sizeMB: {
                image: 10,
                video: 100,
            },
            required: true,
        },
        exhibition: {
            width: 2000,
            height: 3000,
            ppi: 72,
            sizeMB: {
                image: 10,
                video: 100,
            },
            required: true,
        },
        preview: {
            width: 2000,
            height: 2000,
            ppi: 72,
            sizeMB: {
                image: 0.244,
                video: 1,
            },
            required: true,
        },
        print: {
            width: 8000,
            height: 12000,
            ppi: 300,
            sizeMB: {
                image: 500,
                video: 0,
            },
            required: false,
        },
    },
};

export function handleGetFileType(fileOrUrl?: File | string): { contentType: string; mediaType: string } {
    const fileTypes = {
        jpg: { contentType: 'JPEG', mediaType: 'image' },
        jpeg: { contentType: 'JPEG', mediaType: 'image' },
        png: { contentType: 'PNG', mediaType: 'image' },
        gif: { contentType: 'GIF', mediaType: 'image' },
        webp: { contentType: 'WEBP', mediaType: 'image' },
        svg: { contentType: 'SVG', mediaType: 'image' },
        mp4: { contentType: 'MP4', mediaType: 'video' },
        webm: { contentType: 'WEBM', mediaType: 'video' },
    };

    if (fileOrUrl instanceof File) {
        const mediaType = fileOrUrl.type.startsWith('image/') ? 'image' : 'video';
        const contentType = fileOrUrl.type.split('/')[1].toUpperCase();
        return { contentType, mediaType };
    } else if (typeof fileOrUrl === 'string') {
        const extension = fileOrUrl.split('.').pop()?.toLowerCase();
        return fileTypes[extension as keyof typeof fileTypes] || { contentType: '', mediaType: '' };
    }

    return { contentType: '', mediaType: '' };
}

export function handleGetFileWidthAndHeight(fileOrUrl: File | string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        let isVideo = false;

        if (fileOrUrl instanceof File) {
            isVideo = fileOrUrl.type.startsWith('video/');
        } else if (typeof fileOrUrl === 'string') {
            isVideo = /\.(mp4|webm|ogg)$/i.test(fileOrUrl);
        }

        const mediaElement = isVideo ? document.createElement('video') : new Image();

        const resolveDimensions = function () {
            const width = isVideo ? (mediaElement as HTMLVideoElement).videoWidth : mediaElement.width;
            const height = isVideo ? (mediaElement as HTMLVideoElement).videoHeight : mediaElement.height;

            resolve({ width, height });
        };

        if (isVideo) {
            (mediaElement as HTMLVideoElement).onloadedmetadata = resolveDimensions;
        } else {
            mediaElement.onload = resolveDimensions;
        }

        mediaElement.onerror = function (error) {
            reject(error);
        };

        try {
            if (fileOrUrl instanceof File) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    if (!e.target) {
                        return;
                    }

                    mediaElement.src = e.target.result as string;
                    if (isVideo) {
                        (mediaElement as HTMLVideoElement).load();
                    }
                };

                reader.readAsDataURL(fileOrUrl);
            } else if (typeof fileOrUrl === 'string') {
                mediaElement.src = fileOrUrl;
                if (isVideo) {
                    (mediaElement as HTMLVideoElement).load();
                }
            } else {
                throw new Error('Invalid input. Expecting a File or a URL string.');
            }
        } catch (error) {
            reject(error);
        }
    });
}

export function getFileSize(size?: number): string {
    if (!size) return '';
    const bytes = size | 0;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export function calculatePPI(fileOrUrl: File | string): Promise<number | null> {
    return new Promise((resolve) => {
        const image = new Image();

        image.onload = function () {
            const widthInPixels = image.width;
            const widthInInches = widthInPixels / image.naturalWidth;

            const ppi = widthInPixels / widthInInches;
            resolve(ppi);
        };

        image.onerror = function (error) {
            resolve(null);
        };

        if (fileOrUrl instanceof File) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (!e.target) {
                    return;
                }
                image.src = e.target.result as string;
            };

            reader.readAsDataURL(fileOrUrl);
        } else if (typeof fileOrUrl === 'string') {
            image.src = fileOrUrl;
        } else {
            resolve(null);
        }
    });
}

export async function getMediaDefinition({
    fileOrUrl,
}: {
    fileOrUrl: File | string;
}): Promise<{ definition: Definition; width: number; height: number }> {
    const imgWidthAndHeight = await handleGetFileWidthAndHeight(fileOrUrl);
    const defReturn = { width: imgWidthAndHeight.width, height: imgWidthAndHeight.height, definition: 'square' } as {
        width: number;
        height: number;
        definition: Definition;
    };

    if (imgWidthAndHeight.width > imgWidthAndHeight.height) {
        defReturn.definition = 'landscape';
    } else if (imgWidthAndHeight.height > imgWidthAndHeight.width) {
        defReturn.definition = 'portrait';
    }

    return defReturn;
}

export function getStepStatus({ formats }: { formats: FormatsMedia }) {
    return Object.entries(formats || {})
        .filter(([key, value]) => key !== 'print')
        .every(([key, value]) => value.file)
        ? 'completed'
        : Object.values(formats || {}).some((format) => format.file) || formats?.original?.file
          ? 'inProgress'
          : 'notStarted';
}

export function formatFileSize(fileSizeInMB: number): string {
    if (fileSizeInMB < 1) {
        const fileSizeInKB = Math.round(fileSizeInMB * 1000);
        return `${fileSizeInKB} KB`;
    } else {
        const fileSizeInMBInt = Math.round(fileSizeInMB);
        return `${fileSizeInMBInt} MB`;
    }
}
