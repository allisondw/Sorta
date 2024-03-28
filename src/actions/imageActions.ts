export enum ColorChannel {
    None = 'none',
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}
export type Direction = 'horizontal' | 'vertical';
export type Threshold = number;
// export type ImageData = 

export const SET_THRESHOLD = 'SET_THRESHOLD';
export const SET_COLOR_CHANNEL = 'SET_COLOR_CHANNEL';
export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_ORIGINAL_IMAGE_DATA = "SET_ORIGINAL_IMAGE_DATA";
export const RESET_ORIGINAL_IMAGE_DATA = "RESET_ORIGINAL_IMAGE_DATA";

type setThresholdAction = {
    type: 'SET_THRESHOLD';
    payload: number;
};

type setColorChannelAction = {
    type: 'SET_COLOR_CHANNEL',
    payload: ColorChannel,
};

type setDirectionAction = {
    type: 'SET_DIRECTION',
    payload: Direction,
};

type setOriginalImageDataAction = {
    type: typeof SET_ORIGINAL_IMAGE_DATA;
    payload: ImageData;
};

export const setOriginalImageData = (imageData: ImageData): setOriginalImageDataAction => ({
    type: SET_ORIGINAL_IMAGE_DATA,
    payload: imageData,
});

export const resetOriginalImageData = () => ({
    type: RESET_ORIGINAL_IMAGE_DATA,
});

export const setThreshold = (payload: number): setThresholdAction => ({
    type: SET_THRESHOLD,
    payload,
});

export const setColorChannel = (payload: ColorChannel): setColorChannelAction => ({
    type: SET_COLOR_CHANNEL,
    payload,
});

export const setDirection = (payload: Direction): setDirectionAction => ({
    type: SET_DIRECTION,
    payload,
});

export type ImageAction = setThresholdAction | setColorChannelAction | setDirectionAction | setOriginalImageDataAction;
