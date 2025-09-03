import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../Redux/Movieslice";
import tvSlice from "../Redux/Tvslice"; 
const store = configureStore({
    reducer:{
        movie:movieSlice,
        tv:tvSlice,

    }
})

export default store;