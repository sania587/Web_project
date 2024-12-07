// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';  // Import your reducers

const store = configureStore({
  reducer: {
    auth: authReducer,  // You can add other reducers as needed
  },
});

export default store;
