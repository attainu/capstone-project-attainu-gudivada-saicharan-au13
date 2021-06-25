import DashboardNav from '../components/DashboardNav'
import {Link} from 'react-router-dom';
import {userHotelBookings} from '../actions/hotel';
import {useSelector} from 'react-redux';
import {useState,useEffect} from "react";

  const Dashboard = () => {
 const {
     auth:{token},
    } = useSelector((state)=>({...state})) ; 
    const [booking,setBooking]  = useState([]);

     useEffect(()=>{
     loadUserBookings()
     },[])
     const loadUserBookings = async()=> {
      const res= await  userHotelBookings(token)
      console.log(res);    
      setBooking(res.data);    
     } ;

    
    return (
        <>
            
            <div className="container-fluid pt-5 ">
                <h3 className="text-center">Dashboard</h3>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            
            <div className="row">
            <pre>{JSON.stringify(booking,null,4)}</pre>
            </div>
        </>
    );
};

export default Dashboard;