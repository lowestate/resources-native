import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Resources: [],
    Resource: {},
};

export const ResourceSlice = createSlice({
    name: 'Resource',
    initialState,
    reducers: {
        setResources: (state, { payload }) => {
            console.log('setResources');
            state.Resources = payload;
        },
        setResource: (state, { payload }) => {
            console.log('setResource');
            state.Resource = payload;
        },
        resetResource: (state) => {
            console.log('resetResource');
            state.Resource = {};
        },
    },
});

export const ResourceReducer = ResourceSlice.reducer;

export const { setResources, setResource, resetResource } = ResourceSlice.actions;