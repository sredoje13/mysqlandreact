import { Route,Switch } from 'react-router-dom';
import './App.css';
import Navpage from './components/Navpage/Navpage';
import Mainpage from './components/Mainpage/Mainpage';
import Allobligation from './components/Allobligation/Allobligation';
import Input from './components/Inputpage/Input';
import Image from './background.jpg'
import { useSelector,useDispatch } from 'react-redux';
import { cart } from './components/store/redux';
import  { Toaster } from 'react-hot-toast';
function App() {
  const dispatch=useDispatch()
  const update=useSelector((state)=>state.cartitem.update)
  const location=window.location.pathname
  if(location!=="/makeobligations"){
    dispatch(cart.setupdate())
    }
    else{
      dispatch(cart.unsetupdate()) 
    }
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
        <Route path={update?"/updateitem:id":`/makeobligations`}exact>
          <Input/>

        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
