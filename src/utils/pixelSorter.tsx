enum ColorChannel {
    None = "none",
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}

type Pixel = [number, number, number, number];
type Direction = 'horizontal' | 'vertical';

export const sortPixels = (
    pixels: ImageData, 
    imageDataWidth: number,
    sortingThreshold: number = 0,
    colorChannel?: ColorChannel | undefined,
    direction: Direction = 'horizontal',
    ): void => {

    const rowLength = imageDataWidth * 4;
    if (direction === 'horizontal') {

        for (let rowStart = 0; rowStart < pixels.data.length; rowStart += rowLength) {
          let rowEnd = rowStart + rowLength;
          let rowPixels: Pixel[] = [];
  
          for (let i = rowStart; i < rowEnd; i += 4) {
            rowPixels.push([pixels.data[i], pixels.data[i + 1], pixels.data[i + 2], pixels.data[i + 3]]);
          }
  
          rowPixels.sort((a, b) => {
            if (colorChannel === ColorChannel.None || !colorChannel) {
              let brightnessA = calculateBrightness(a as Pixel);
              let brightnessB = calculateBrightness(b as Pixel);
              if (brightnessA > sortingThreshold && brightnessB > sortingThreshold) {
                return compareBrightness(a as Pixel, b as Pixel);
              }
            } else {
              let valueA = getValueByColorChannel(a as Pixel, colorChannel as ColorChannel);
              let valueB = getValueByColorChannel(b as Pixel, colorChannel as ColorChannel);
              if (valueA > sortingThreshold && valueB > sortingThreshold) {
                return valueA - valueB;
              }
            }
            return 0;
          });
  
  
            for (let i = rowStart, j = 0; i < rowEnd; i += 4, j++) {
                pixels.data[i] = rowPixels[j][0];
                pixels.data[i + 1] = rowPixels[j][1];
                pixels.data[i + 2] = rowPixels[j][2];
                pixels.data[i + 3] = rowPixels[j][3];
                }
            }
        } else if (direction === 'vertical') {
        for (let colStart = 0; colStart < rowLength; colStart += 4) {
          let colPixels: Pixel[] = [];
  
  
          for (let i = colStart; i < pixels.data.length; i += rowLength) {
            colPixels.push([pixels.data[i], pixels.data[i + 1], pixels.data[i + 2], pixels.data[i + 3]]);
          }
  
    
          colPixels.sort((a, b) => {
            if (colorChannel === ColorChannel.None || !colorChannel) {
              let brightnessA = calculateBrightness(a as Pixel);
              let brightnessB = calculateBrightness(b as Pixel);
              if (brightnessA > sortingThreshold && brightnessB > sortingThreshold) {
                return compareBrightness(a as Pixel, b as Pixel);
              }
            } else {
              let valueA = getValueByColorChannel(a as Pixel, colorChannel as ColorChannel);
              let valueB = getValueByColorChannel(b as Pixel, colorChannel as ColorChannel);
              if (valueA > sortingThreshold && valueB > sortingThreshold) {
                return valueA - valueB;
              }
            }
            return 0;
          });
  
  
          for (let i = colStart, j = 0; i < pixels.data.length; i += rowLength, j++) {
            pixels.data[i] = colPixels[j][0];
            pixels.data[i + 1] = colPixels[j][1];
            pixels.data[i + 2] = colPixels[j][2];
            pixels.data[i + 3] = colPixels[j][3];
          }
        }
    }
};

export const getValueByColorChannel = (pixel: Pixel, channel: ColorChannel): number => {
  const channelMap: {[key: string]: number } = { 
      [ColorChannel.Red]: 0, 
      [ColorChannel.Green]: 1, 
      [ColorChannel.Blue]: 2
    };
  return pixel[channelMap[channel]];
};

export const calculateBrightness = (pixel: Pixel) => {
    return 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2];
};

export const compareBrightness = (a: Pixel, b: Pixel): number => {
    let brightnessA = 0.299 * Number(a[0]) + 0.587 * Number(a[1]) + 0.114 * Number(a[2]);
    let brightnessB = 0.299 * Number(b[0]) + 0.586 * Number(b[1]) + 0.114 * Number(b[2]);
    return brightnessA - brightnessB;
};