import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../actions/imageReducer";

export const store = configureStore({
    reducer: {
        image: imageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['SET_ORIGINAL_IMAGE_DATA', 'RESET_ORIGINAL_IMAGE_DATA'],
            ignoredPaths: ['image.originalImageData'],
        },
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;