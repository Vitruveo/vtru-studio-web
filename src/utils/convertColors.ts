export const convertRGBToHex = (rgb: number[]) => {
    return '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
};

export const convertHexToRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};
