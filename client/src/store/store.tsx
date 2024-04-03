import { Middleware, configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";


const UserMiddleware:Middleware=(store)=>(next)=>(action:any)=>{
    
    next(action)
    if (action.type=='user/setToken') {
        const newState=store.getState()
        const {token} = newState.user

        localStorage.setItem('__user__',JSON.stringify({token}))
        
    }

    if (action.type=='user/clearUser') {
        localStorage.removeItem('__user__')
        
    }
    if (action.type=='user/setUser') {
        const newState=store.getState()
        const {image,name,username} = newState.user
        const state=JSON.parse(localStorage.getItem('__user__')||'')
        state.image=image
        state.name=name
        state.username=username
        localStorage.setItem('__user__',JSON.stringify({...state}))
    }
}


export const store=configureStore({
    reducer:{
        user:userReducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(UserMiddleware)}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

