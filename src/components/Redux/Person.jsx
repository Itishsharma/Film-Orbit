import { createSlice } from "@reduxjs/toolkit";

const initialState={
    info:null
}


const personSlice =createSlice({
    name:"person",
    initialState,
    reducers:{
        loadperson:(state,action)=>{
            state.info=action.payload
        }
    },
})

export const {loadperson}=personSlice.actions;
export default personSlice.reducer;