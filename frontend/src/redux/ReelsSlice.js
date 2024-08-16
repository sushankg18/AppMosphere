import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allReels : []
}

const reelsSlice = createSlice({
    name : "reels",
    initialState,
    reducers : {
        setReels : (state , action) => {
            state.reels = action.payload
        }
    }
})

export const {setReels} = reelsSlice.actions;
export default reelsSlice.reducer