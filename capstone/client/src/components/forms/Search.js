import React,{useState} from 'react';
import DatePicker from 'react-datepicker'  
import {Select} from "antd";
import {SearchOutlined} from '@ant-design/icons'; 
import AlgoliaPlaces from 'algolia-places-react';
import moment from 'moment';
import {useHistory} from 'react-router-dom'


const {Option}= Select;
// route


const config={
    appId:process.env.VC1VDVH9GN,
    apiKey:process.env.REACT_APP_ALGOLIA_API_KEY,
    language:"en",
   //  countries:['in'],
}

const Search =()=>{
     const [location,setLocation] = useState('');

const history = useHistory();
const handleSubmit= ()=>{
    history.push(`/search-result?location=${location}`);
};
return(
    <div className="d-flex pb-4">
    <div className="w-100">
    <AlgoliaPlaces
    placeholder="Location"
    defaultValue={location}
    options={config}
    onChange={( {suggestion})=>setLocation(suggestion.value)}   
    style={{height:"50px"}} 
    id="location-input" />    
     </div>
 <SearchOutlined onClick={handleSubmit } className="btn btn-primary btn-square d-flex justify-content-center align-items-center" id="search-btn" 
 />
    
   
   </div>


)
}
export default Search;


