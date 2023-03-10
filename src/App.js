import { Route,Switch } from 'react-router-dom';
import './App.css';
import Navpage from './components/Navpage/Navpage';
import Mainpage from './components/Mainpage/Mainpage';
import Allobligation from './components/Allobligation/Allobligation';
import Input from './components/Inputpage/Input';
import Image from './background.jpg'
import { useDispatch } from 'react-redux';
import { cart } from './components/store/redux';
import  { Toaster } from 'react-hot-toast';
import { useEffect,useCallback } from 'react';
import { useLocation } from 'react-router-dom';
function App() {
  const loc=useLocation()
  console.log(loc)
  const dispatch=useDispatch()
  let location=loc.pathname
  console.log(location)
  
  if(location.includes("/updateitem")){
   
    dispatch(cart.setupdate())
    
    /*  */
    }
    else{ dispatch(cart.unsetupdate()) }
   
  
  return (
    <div className="App"
    style={{background:`url(${Image})`,
  backgroundSize:"cover"
  }}
    >

      <Navpage/>
      <Toaster />
      <Switch>
        <Route path='/' exact>
       <Mainpage/>
        </Route>
        <Route path="/allobligations" exact>
    <Allobligation/>
        </Route>
        <Route path='/makeobligations'exact>
          <Input/>

        </Route>
        <Route path='/updateitem:id' exact>
          <Input/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
