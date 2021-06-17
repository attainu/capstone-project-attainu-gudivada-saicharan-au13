import express from 'express'
import formidable from 'express-formidable'; 
  
const router = express.Router()


// middlewares
import {requireSignin,hotelOwner} from '../middlewares';

import {create ,hotels,image,sellerHotels,remove,read,update,userHotelBookings,searchListings} from "../controllers/hotel";
 


router.post("/create-hotel",requireSignin,formidable(), create );
router.get('/hotels',hotels)
router.get('/hotel/image/:hotelId',image);
router.get('/seller-hotels',requireSignin,sellerHotels)
router.delete('/delete-hotel/:hotelId',requireSignin,hotelOwner,remove)
router.get('/hotel/:hotelId',read);
router.put('/update-hotel/:hotelId',requireSignin,hotelOwner,formidable(),update);
// orders
router.get('/user-hotel-bookings',requireSignin,userHotelBookings)
router.post('/search-listings', searchListings)

module.exports = router;