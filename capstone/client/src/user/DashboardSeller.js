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

            
            <div className="container-fluid pt-5">
                <h3 className="text-center">Dashboard</h3>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">
               <div className="row no-gutters">
                  <div className="col-12 col-md-8 mx-auto">
                    <div className="row no-gutters mb-4">
                        <div className="col-7">
                            <h2>Your Hotels</h2>
                        </div>
                        <div className="col-5 d-flex justify-content-end">
                            <Link  to="/hotels/new"className="btn btn-info align-self-center">
                              + Add New
                          </Link>
                        </div>
                    </div>
                  </div>
               </div>
               <div className="row no-gutters"> 
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