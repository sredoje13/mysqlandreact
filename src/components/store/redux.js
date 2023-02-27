import { createSlice ,configureStore} from "@reduxjs/toolkit";
const cartitem=createSlice({
    name:"cartitem",
    initialState:{ item:{},update:false, delete:false},
    reducers:{
        additem(state,action){
       state.item=action.payload;
       state.update=true

        },
        setupdate(state,action){
             state.update=true
             },
        unsetupdate(state,action){
            state.update=false
            },
        setdelete(state,action){
            state.delete=true
            state.item=action.payload;
                },
        close(state,action){
            state.delete=false
            },
    }
})

export const store=configureStore({
    reducer:{
        cartitem:cartitem.reducer

    }
})
export const cart=cartitem.actions;