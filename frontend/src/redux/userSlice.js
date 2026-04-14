import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        loading: false,
        user: null
    }
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setUser:(state,action)=>{        
            state.user = action.payload
        },
        resetUser:(state)=>initialState
    }
})

export const {setLoading, setUser, resetUser} = userSlice.actions
export default userSlice.reducer