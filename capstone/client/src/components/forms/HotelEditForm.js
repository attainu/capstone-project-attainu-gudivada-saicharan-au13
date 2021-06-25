import AlgoliaPlaces from "algolia-places-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useState } from "react";

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
        <div className="row no-gutters">
          {/* <div className="col-12 mb-3">
            <label className="btn btn-outline-secondary btn-block  text-left">
              Re-Upload Hotel Image
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
            </label>
          </div> */}
          <div className="row no-gutters">
            {/* <div className="col-12">
            <label className="btn btn-outline-secondary btn-block text-left">
              Upload Hotel Image
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
            </label>
          </div> */}
            <div className="col-12 mb-3">
              <label for="" class="mb-1">
                Hotel Title:
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                className="form-control"
                value={title}
              />
            </div>
            <div className="col-12 mb-3">
              <label for="" class="mb-1">
                Hotel Description:
              </label>
              <textarea
                name="content"
                onChange={handleChange}
                placeholder="Content"
                className="form-control"
                value={content}
              />
            </div>
            <div className="col-12 mb-3">
              <label for="" class="mb-1">
                Hotel Location:
              </label>
              {location && location.length && (
                <AlgoliaPlaces
                  className="form-control"
                  placeholder="Location"
                  defaultValue={location}
                  options={config}
                  onChange={({ suggestion }) =>
                    setValues({ ...values, location: suggestion.value })
                  }
                  style={{ height: "50px" }}
                />
              )}
            </div>
            <div className="col-12 mb-3">
              <label for="" class="mb-1">
                Hotel Price:
              </label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="Price"
                className="form-control"
                value={price}
              />
            </div>
            <div className="col-12 mb-3">
              <label for="" class="mb-1">
                Number of Beds:
              </label>
              <input
                type="number"
                name="bed"
                onChange={handleChange}
                placeholder="Number of Beds"
                className="form-control"
                value={bed}
              />
            </div>
            <div className="col-12 mb-3">
              <div className="row no-gutters">
                <div class="col-md-5">
                  <label for="" class="mb-1 mt-1 d-block">
                    Start Date:
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
                <div class="col-md-5 ">
                  <label for="" class="mb-1 mt-1 d-block">
                    End Date:
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 pt-3 pb-5">
              <button className="btn btn-block btn-lg btn-outline-primary w-100">
                Update Hotel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default HotelEditForm;
