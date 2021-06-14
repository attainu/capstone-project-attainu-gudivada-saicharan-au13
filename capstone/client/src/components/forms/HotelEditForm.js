import AlgoliaPlaces from "algolia-places-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {useState} from 'react';




const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  // countries: ["au"],
};

const HotelEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, content, location, price, bed, starDate, enDate } = values;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        {location && location.length && (
          <AlgoliaPlaces
            className="form-control m-2"
            placeholder="Location"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) =>
              setValues({ ...values, location: suggestion.value })
            }
            style={{ height: "50px" }}
          />
        )}

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <input
        type="number"
         name="bed"
          onChange={handleChange}
          placeholder="Number of Beds"
           className="form-control m-2"
            value={bed}
           /> 

            
      </div>

      <DatePicker
   
      selected={startDate}
      onChange={date => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
    />
    <DatePicker
     
      selected={endDate}
      onChange={date => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
    />

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
        }
export default HotelEditForm;       