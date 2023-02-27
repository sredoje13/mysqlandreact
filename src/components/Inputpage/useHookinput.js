import { useState } from "react"

const useHook=()=>{
    const[input,setinput]=useState("")
    const[istouched,setistouched]=useState(false)
   let validateinput=false
const onChangeinput=(e)=>{
   setinput(e.target.value);

   setistouched(true)
   
}
const onBlurinput=()=>{
    setistouched(true)
}
const restart=()=>{
    setistouched(false)
    setinput("")
}
if(input.trim()!==""){
    validateinput=true
   }
   else{validateinput=false}

 const error=!validateinput&&istouched


return{
 input:input,
 error:error,
 onBlurinput:onBlurinput,
 onChangeinput:onChangeinput,
 validateinput:validateinput,
restart:restart,
istouched:istouched
}

}
export default useHook