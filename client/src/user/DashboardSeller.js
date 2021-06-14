import {useState,useEffect} from 'react'
import DashboardNav from '../components/DashboardNav'
import {Link} from 'react-router-dom';
import {sellerHotels,deleteHotel} from '../actions/hotel';
import {useSelector} from "react-redux"
import SmallCard from   '../components/cards/SmallCard';
import {toast} from "react-toastify";


 
 




const DashboardSeller     = () => {
    const {auth} =useSelector((state)=>({...state}));
    const [hotels,setHotels]=useState([])
  useEffect(()=>{
    loadSellerHotels()
  },[])  


  const loadSellerHotels = async () =>{
      let {data}=await sellerHotels(auth.token)
      setHotels(data)
  }

const handleHotelDelete = async (hotelId) =>{
  if(!window.confirm('Are you Sure?')) return;
  deleteHotel(auth.token,hotelId).then(res =>{
    toast.success("Hotel Deleted");
    loadSellerHotels();
  })
    
}


    return (
        <>

            
            <div className="container-fluid bg-info p-5">
                <h1>Dashboard</h1>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">
               <div className="row">
               <div className="col-md-10">
               <h2>Your Hotels</h2>
               </div>
               <div className="col-md-2">
               <Link  to="/hotels/new"className="btn btn-info">
             + Add New
               </Link>

               </div>

               </div>
               <div className="row"> 
               {hotels.map(h=>
                 <SmallCard key={h._id} h={h}
                  showViewMoreButton={false} owner={true}
                  handleHotelDelete={handleHotelDelete}
                  />)}
              
               </div>
            </div>
        </>
    );
};

export default DashboardSeller;   