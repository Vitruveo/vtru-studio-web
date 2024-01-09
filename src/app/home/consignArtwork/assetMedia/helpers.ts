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
