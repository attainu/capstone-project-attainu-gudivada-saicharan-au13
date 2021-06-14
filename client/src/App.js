import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TopNav from "./components/TopNav"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";


// components
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
 import NewHotel from  "./hotels/NewHotel";
import EditHotel from './hotels/Edithotel';
import ViewHotel from './hotels/ViewHotel'; 
import SearchResult from './hotels/SearchResult';







function App() {

function handleToken(token, addresses) {
  console.log({ token, addresses })
}
  return (
    
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        <Route exact path="/search-result" component={SearchResult} />
         
        
      </switch>
      
      
    </BrowserRouter>
  );
}

export default App;
