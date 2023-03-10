
import {BsCalendarCheck} from 'react-icons/bs'
import {MdOutlineNoteAlt} from 'react-icons/md'
import {GiBowTieRibbon} from 'react-icons/gi'
import classes from './input.module.css'
import axios from 'axios'
import useHook from './useHookinput';
import {Link, useLocation} from 'react-router-dom'
import Image from '../../Myproject.jpg'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast'
function Input(props) {

   const history=useHistory()
    const update=useSelector((state)=>state.cartitem.update)
  const loc=useLocation()
const location=window.location.pathname.split("/")[1].split(":")
console.log(location)
console.log(location[1])

   let isvalid=false
const {
    input:nameValue,
 error:errorname,
 onBlurinput:blurName,
 onChangeinput:changeName,
restart:restartName,
istouched:istouchedname
   
   }=useHook()
   const {
    input:dateValue,
 error:errordate,
 onBlurinput:blurDate,
 onChangeinput:changeDate,
restart:restartDate,
istouched:istoucheddate
   }=useHook()
   const {
    input:areaValue,
 error:errorarea,
 onBlurinput:blurArea,
 onChangeinput:changeArea,
restart:restartArea,
istouched:istouchedarea
   
   }=useHook()
const classarea=!errorarea?classes.input:classes.error;
const classname=!errorname?classes.input:classes.error;
const classdate=!errordate?classes.input:classes.error;
if(!errorarea&&!errordate&&!errorname&&istoucheddate&&istouchedarea&&istouchedname){
    isvalid=true
}
else{isvalid=false}

const alldatas={
    date:dateValue,
    name:nameValue,
    text:areaValue,
    
}
const submitHandler=async(e)=>{
e.preventDefault()
try{
 
if(isvalid){
   await axios.post("https://jelenatodo.herokuapp.com/listofobligation",alldatas)
 restartArea();
restartDate();
restartName();
toast.success("Uspesno ste sastavili svoj naredni zadatak!")
}
else{
    toast.error("Morate popuniti sva polja!!!")
}
}
catch(err){
    console.log(err)
}
}
const updateitems=async(e)=>{
    e.preventDefault()
    try{
      
        if(isvalid){
           await axios.put(`https://jelenatodo.herokuapp.com/listofobligation/${location[1]}`,alldatas)
        restartArea();
        restartDate();
        restartName();
        toast.success("Uspesno ste ispravili svoj zadatak!")
        history.push("/allobligations");

        }
        else{
            toast.error("Morate popuniti sva polja!!!")
        }
        }
        catch(err){
            console.log(err)
        }
}

console.log(update)
    return (
        <div style={{width:"100%", marginTop:"0%"}}>
          {update&&<h1 className="title">ISPRAVITE ZADATAK</h1>}
          {!update&&<h1 className="title">NAPRAVITE NOVI ZADATAK</h1>}
            <form className={classes.form} onSubmit={update?updateitems:submitHandler}>
                <label className={classes.label}>Naziv obaveze
                  <GiBowTieRibbon className={classes.icon} /></label>
           <input max={15} onChange={changeName} onBlur={blurName}
           value={nameValue}
           
           className={`${classname } ${classes.left}`} type="text"/>
           <label className={classes.label}>Opis 
           <MdOutlineNoteAlt  className={classes.icon}/></label>
           <textarea onChange={changeArea} onBlur={blurArea}
           value={areaValue}
           className={`${classarea } ${classes.right}`} type="text"/>
           <label className={classes.label}>Izaberi datum 
           <BsCalendarCheck  className={classes.icon}/></label>
           <input onChange={changeDate} onBlur={blurDate}
           placeholder="2023-01-02"
           value={dateValue} className={`${classdate } ${classes.left}`}type="date" min="2023-01-02"/>
         {!update&& <button className={classes.formbutton}>Dodaj obavezu</button>}
         {update&& <button className={classes.formbutton}>Izmeni obavezu</button>}
            </form>
            <div className={classes.divlink}>
          <button  className={`${classes.buttonlink } ${classes.left}`}><Link className={classes.link} to="/">Vratite se na pocetnu stranicu</Link></button> 
            <button className={`${classes.buttonlink } ${classes.right}`}><Link className={classes.link} to="/allobligations">Pogledaj svoju listu</Link></button>
            </div> 
            <div className={classes.heartdiv}><img className={classes.img1} src={Image} alt="slika"/>
            <img className={classes.img2} src={Image} alt="slika"/>
            <img className={classes.img3} src={Image} alt="slika"/>
            <img className={classes.img4} src={Image} alt="slika"/>
            <img className={classes.img5} src={Image} alt="slika"/>
            </div>
           
        </div>
    );
}

export default Input;