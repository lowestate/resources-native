import { configureStore } from '@reduxjs/toolkit';
import { ResourceReducer } from './resourceSlice';


export const store = configureStore({ reducer: {Resource: ResourceReducer} });