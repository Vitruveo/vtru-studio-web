export const mediaConfigs = {
    landscape: {
        display: {
            width: 3840,
            height: 2160,
            ppi: 72,
            sizeMB: 10,
            required: true,
        },
        exhibition: {
            width: 3000,
            height: 2000,
            ppi: 72,
            sizeMB: 10,
            required: true,
        },
        preview: {
            width: 2000,
            height: 2000,
            ppi: 72,
            sizeMB: 0.244,
            required: true,
        },
        print: {
            width: 12000,
            height: 8000,
            ppi: 300,
            sizeMB: 500,
            required: false,
        },
    },
    square: {
        display: {
            width: 3840,
            height: 3840,
            ppi: 72,
            sizeMB: 10,
            required: true,
        },
        exhibition: {
            width: 3000,
            height: 3000,
            ppi: 72,
            sizeMB: 10,
            required: true,
        },
        preview: {
            width: 2000,
            height: 2000,
            ppi: 72,
            sizeMB: 0.244,
            required: true,
        },
        print: {
            width: 12000,
            height: 12000,
            ppi: 300,
            sizeMB: 500,
            required: false,
        },
    },
    portrait: {
        display: {
            width: 2160,
            height: 3840,
            ppi: 72,
            sizeMB: 10,
            required: true,
        },
        exhibition: {
            width: 2000,
            height: 3000,
            ppi: 72,
            sizeMB: 10,
            required: true,
        },
        preview: {
            width: 2000,
            height: 2000,
            ppi: 72,
            sizeMB: 0.244,
            required: true,
        },
        print: {
            width: 8000,
            height: 12000,
            ppi: 300,
            sizeMB: 500,
            required: false,
        },
    },
};

export function handleGetFileWidthAndHeight(fileOrUrl: File | string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function () {
            const width = img.width;
            const height = img.height;

            resolve({ width, height });
        };

        img.onerror = function (error) {
            reject(error);
        };

        try {
            if (fileOrUrl instanceof File) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    if (!e.target) {
                        return;
                    }
                    img.src = e.target.result as string;
                };

                reader.readAsDataURL(fileOrUrl);
            } else if (typeof fileOrUrl === 'string') {
                img.src = fileOrUrl;
            } else {
                throw new Error('Invalid input. Expecting a File or a URL string.');
            }
        } catch (error) {
            reject(error);
        }
    });
}

// function formatSize(bytes: number): string {

// }

export function getFileSize(fileOrUrl: File | string): string {
    const isFile = fileOrUrl instanceof File;

    if (isFile) {
        const bytes = (fileOrUrl as File).size || 0;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    }

    return '';
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

export async function getMediaDefinition({ fileOrUrl }: { fileOrUrl: File | string }): Promise<string> {
    const imgWidthAndHeight = await handleGetFileWidthAndHeight(fileOrUrl);

    if (imgWidthAndHeight.width > imgWidthAndHeight.height) {
        return 'landscape';
    } else if (imgWidthAndHeight.height > imgWidthAndHeight.width) {
        return 'portrait';
    } else {
        return 'square';
    }
}
