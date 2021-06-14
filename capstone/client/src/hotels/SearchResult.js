import {useState,useEffect} from 'react';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import Search from '../components/forms/Search'; 
import {searchListings} from '../actions/hotel';   
import SmallCard from '../components/cards/SmallCard' ;
 

const SearchResult =()=>{

    // /
    const [searchLocation,setSearchLocation] = useState('') ;  
    const [hotels,setHotels] = useState([]);

    useEffect(()=>{
     const {location} = queryString.parse(window.location.search);
    //  console.table({location})   
    searchListings({location}).then(res =>{
        console.log('SEARCH RESULTS ===>',res.data);
        setHotels(res.data)
    });
    },[window.location.search])
    return(
        <>
        <div className="col">
        <br/>
        <Search/>
        </div>
        <div className="container">
        <div className="row">
       {
           hotels.map(h=> <SmallCard key={h._id} h={h}/>)
       }
        </div>
        </div>
        </>
    )
}

export default SearchResult