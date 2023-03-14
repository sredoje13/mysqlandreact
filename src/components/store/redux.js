import { createSlice ,configureStore} from "@reduxjs/toolkit";
import _ from 'lodash'
const cartitem=createSlice({
    name:"cartitem",
    initialState:{ item:{},update:false, 
    delete:false,tasks:[],heart:false, chechkitem:[]},
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
           
           
          const checkeditem=action.payload
          const showitem={...checkeditem,check:true}
          const otheritem={...checkeditem,check:null}
         const itemone=state.tasks.filter((item)=>item.id!==checkeditem.id)
         const itemones=state.tasks.findIndex((item)=>item.id===checkeditem.id)
         console.log(checkeditem)
         state.index=itemones
         if(!action.payload.check){
         state.tasks=[showitem,...itemone]
        
         }
         else if(action.payload.check){
            state.tasks[itemones]=otheritem 
         }
        
         
        },
       getallcheckitems(state,action){
       
        var Obj3 = _.differenceWith(state.tasks, action.payload, function (o1, o2) {
            return o2['id'] === o1['id']
        });
      
       
        
      
       state.tasks=[...action.payload,...Obj3]
      
        }
     

        
    }
})

export const store=configureStore({
    reducer:{
        cartitem:cartitem.reducer

    }
})
export const cart=cartitem.actions;