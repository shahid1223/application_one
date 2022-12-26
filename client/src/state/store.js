import { configureStore } from '@reduxjs/toolkit';
import detailsSlice from './details/detailsSlice';

const store = configureStore({
    reducer: {
        detail: detailsSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store