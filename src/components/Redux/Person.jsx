import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null,
    loading: false,
    error: null,
    lastUpdated: null
};

const actorSlice = createSlice({
    name: "actor",
    initialState,
    reducers: {
        loadActorStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadActorSuccess: (state, action) => {
            state.info = action.payload;
            state.loading = false;
            state.error = null;
            state.lastUpdated = Date.now();
        },
        loadActorFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearActor: (state) => {
            state.info = null;
            state.error = null;
            state.lastUpdated = null;
        },
        updateActorInfo: (state, action) => {
            if (state.info) {
                state.info = { ...state.info, ...action.payload };
                state.lastUpdated = Date.now();
            }
        }
    },
});

export const { 
    loadActorStart, 
    loadActorSuccess, 
    loadActorFailure, 
    clearActor, 
    updateActorInfo 
} = actorSlice.actions;

export default actorSlice.reducer;

// Selectors for better performance
export const selectActor = (state) => state.actor.info;
export const selectActorLoading = (state) => state.actor.loading;
export const selectActorError = (state) => state.actor.error;
export const selectActorLastUpdated = (state) => state.actor.lastUpdated;