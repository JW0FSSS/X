import { createSlice } from "@reduxjs/toolkit";

const BaseState={
    username:"",
    name:"",
    image:"",
    token:""
}

const initialState=(()=>{
    const userPersist=localStorage.getItem('__user__')
    return userPersist?JSON.parse(userPersist):BaseState
})()

const user=createSlice({
    name:"user",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload.token

            return state
        },
        setUser:(state,action)=>{
            state.name=action.payload.name
            state.username=action.payload.username
            state.image=action.payload.image
            return state
        },
        clearUser:(state)=>{
            state=BaseState
            return state
        }
    }
})

export const {setUser,setToken,clearUser}=user.actions
export default user.reducer