import { createSlice ,configureStore} from "@reduxjs/toolkit";
const cartitem=createSlice({
    name:"cartitem",
    initialState:{ item:{},update:false, delete:false,tasks:[],heart:false},
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
        getitems(state,action){
        state.tasks=action.payload

        },
        checkitem(state,action) {
            state.heart=!state.heart
            const cheking=state.heart
          const checkeditem=action.payload
          const showitem={...checkeditem,check:cheking}
         const itemone=state.tasks.findIndex((item)=>item.id===checkeditem.id)
         console.log(itemone)
         state.tasks[itemone]=showitem
         console.log(state.tasks)

         
        }
        
    }
})

export const store=configureStore({
    reducer:{
        cartitem:cartitem.reducer

    }
})
export const cart=cartitem.actions;