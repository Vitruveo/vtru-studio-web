export function handleGetFileWidthAndHeight(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            if (!e.target) {
                return;
            }

            const img = new Image();
            img.src = e.target.result as string;

            img.onload = function () {
                const width = img.width;
                const height = img.height;

                resolve({ width, height });
            };
        };

        reader.readAsDataURL(file);
    });
}

export function getFileSize(file: File) {
    const bytes = file?.size || 0;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';

    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));

    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}
