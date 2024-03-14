import { Direction } from "./imageActions";
import { SET_THRESHOLD, SET_COLOR_CHANNEL, SET_DIRECTION, ColorChannel, SET_ORIGINAL_IMAGE_DATA, RESET_ORIGINAL_IMAGE_DATA } from "./imageActions";
import { ImageAction } from "./imageActions";
import { Action } from 'redux';

interface ImageState {
    threshold: number,
    colorChannel: ColorChannel,
    direction: Direction,
    originalImageData: ImageData | null;
}

const initialState: ImageState = {
    threshold: 0,
    colorChannel: ColorChannel.None,
    direction: 'horizontal',
    originalImageData: null,
};

export const imageReducer = (
    state: ImageState = initialState, 
    action: Action | ImageAction 
 ) => {
    switch (action.type) {
        case SET_THRESHOLD:
            if ('payload' in action) {
                return { ...state, threshold: action.payload };
            }
            break;
        case SET_COLOR_CHANNEL:
            if ('payload' in action) {
                return { ...state, colorChannel: action.payload };
            }
            break;
        case SET_DIRECTION:
            if ('payload' in action) {
                return { ...state, direction: action.payload };
            }
            break;
        case SET_ORIGINAL_IMAGE_DATA:
            if('payload' in action) {
                return { ...state, originalImageData: action.payload };
            };
            break;
        case RESET_ORIGINAL_IMAGE_DATA:
            return { ...state, originalImageData: null };
        default:
            return state;
    }
};

export default imageReducer;