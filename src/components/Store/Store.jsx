import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../Redux/Movieslice";
import tvSlice from "../Redux/Tvslice";
import  personSlice from '../Redux/Person'
const store = configureStore({
    reducer:{
        movie:movieSlice,
        tv:tvSlice,
        person:personSlice
    }
})

export default store;