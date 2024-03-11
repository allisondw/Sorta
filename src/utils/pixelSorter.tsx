export const sortPixelsSimple = (pixels: Uint8ClampedArray, imageDataWidth: number) => {
    const rowLength = imageDataWidth * 4;
    for (let rowStart = 0; rowStart < pixels.length; rowStart += rowLength) {
        let rowEnd = rowStart + rowLength;
        let rowPixels: number[][] = [];
        for (let i = rowStart; i < rowEnd; i += 4) {
            rowPixels.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
        }
        rowPixels.sort((a, b) => compareBrightness(a, b));
        for (let i = rowStart, j = 0; i < rowEnd; i += 4, j++) {
            pixels[i] = rowPixels[j][0];
            pixels[i + 1] = rowPixels[j][1];
            pixels[i + 2] = rowPixels[j][2];
            pixels[i + 3] = rowPixels[j][3];
        }
    }
};

export const compareBrightness = (a: number[], b: number[]): number => {
    let brightnessA = 0.299 * Number(a[0]) + 0.587 * Number(a[1]) + 0.114 * Number(a[2]);
    let brightnessB = 0.299 * Number(b[0]) + 0.586 * Number(b[1]) + 0.114 * Number(b[2]);
    return brightnessA - brightnessB;
};