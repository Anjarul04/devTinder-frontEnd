import { createSlice } from "@reduxjs/toolkit";

const requestReceivedSlice = createSlice({
    name:"requestReceived",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
            const newArray = state.filter(r=>r._id !== action.payload);
            return newArray;
        }
    }
});
export const {addRequest,removeRequest} = requestReceivedSlice.actions;
export default requestReceivedSlice.reducer;