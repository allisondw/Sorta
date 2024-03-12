export const SET_IMAGE_DATA  = 'SET_IMAGE_DATA';

export interface SetImageDataAction {
    type: typeof SET_IMAGE_DATA;
    payload: {
        imageData: ImageData | null;
    };
}

export const setImageData = (imageData: ImageData | null): SetImageDataAction => {
    return {
        type: SET_IMAGE_DATA,
        payload: { imageData },
    };
};

export type ImageActionTypes = SetImageDataAction;