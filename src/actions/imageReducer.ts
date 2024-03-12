import { ImageActionTypes, SET_IMAGE_DATA, SetImageDataAction } from "./imageActions";
import { Action } from 'redux';

interface ImageState {
    imageData: ImageData | null;
}

const initialState: ImageState = {
    imageData: null,
};

const imageReducer = (state: ImageState = initialState, action: Action | ImageActionTypes): ImageState => {
    if (isSetImageDataAction(action)) {
        return {
            ...state,
            imageData: action.payload.imageData,
        }
    }
    return state;
};

function isSetImageDataAction(action: Action | ImageActionTypes): action is SetImageDataAction {
    return (action as ImageActionTypes).type === SET_IMAGE_DATA;
}

export default imageReducer;