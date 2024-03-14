import { SET_THRESHOLD, SET_COLOR_CHANNEL, SET_DIRECTION, ColorChannel } from "./imageActions";
import { ImageAction } from "./imageActions";
import { Action } from 'redux';

const initialState = {
    threshold: 50,
    colorChannel: ColorChannel.None,
    direction: 'horizontal',
};

export const imageReducer = (
    state = initialState, 
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
        default:
            return state;
    }
};

export default imageReducer;