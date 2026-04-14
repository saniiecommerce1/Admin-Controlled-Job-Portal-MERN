import { createSlice } from "@reduxjs/toolkit";
import { resetCompany } from "./companySlice.js";

const initialState = {
        applicants:null,
    }
const applicationSlice = createSlice({
    name:'application',
    initialState,
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        resetApplication:(state)=>initialState
    }
});
export const {setAllApplicants, resetApplication} = applicationSlice.actions;
export default applicationSlice.reducer;