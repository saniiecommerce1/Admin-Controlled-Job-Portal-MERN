import { createSlice } from "@reduxjs/toolkit";

const  initialState={
        singleCompany:null,
        companies:[],
        searchCompanyByText:"",
    }
const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        },
        resetCompany:(state)=>initialState
    }
});
export const {setSingleCompany, setCompanies,setSearchCompanyByText, resetCompany} = companySlice.actions;
export default companySlice.reducer;