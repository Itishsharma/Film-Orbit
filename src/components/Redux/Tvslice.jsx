import { createSlice } from "@reduxjs/toolkit";

const initialState={
    info:null
}


const tvSlice =createSlice({
    name:"tvslice",
    initialState,
    reducers:{
        loadmovie:(state,action)=>{
            state.info=action.payload
        },
        removemovie:(state,action)=>{
            state.info=null;
        }
    },
})

export const {loadmovie,removemovie}=tvSlice.actions;
export default tvSlice.reducer;