export enum ColorChannel {
    None = 'none',
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}
export type Direction = 'horizontal' | 'vertical';
export type Threshold = number;

export const SET_THRESHOLD = 'SET_THRESHOLD';
export const SET_COLOR_CHANNEL = 'SET_COLOR_CHANNEL';
export const SET_DIRECTION = 'SET_DIRECTION';

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

export type ImageAction = setThresholdAction | setColorChannelAction | setDirectionAction;
