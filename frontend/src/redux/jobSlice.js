import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
        allJobs:[],
        allSearchJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    }
const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
          setAllSearchJobs:(state,action) => {
            state.allSearchJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        resetJob:(state)=>initialState
    }
});
export const {
    setAllJobs, 
    setAllSearchJobs,
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery,
    resetJob
} = jobSlice.actions;

export default jobSlice.reducer;