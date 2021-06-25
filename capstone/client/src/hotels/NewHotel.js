import { useState } from "react";
import { toast } from "react-toastify";
import AlgoliaPlaces from "algolia-places-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";

const config = {
  appId: process.env.VC1VDVH9GN,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  //  countries:['in'],
};

const NewHotel = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/400x400.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  const { title, content, image, price, starDate, enDate, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("starDate", startDate);
    hotelData.append("enDate", endDate);
    hotelData.append("bed", bed);
    console.log([...hotelData]);

    try {
      let res = await createHotel(token, hotelData);
      console.log("HOTEL CREATE RES", res);
      toast.success("New hotel is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const handleImageChange = (e) => {
    //    console.log(e.target.files[0] );
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
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
              placeholder="Enter Hotel Title"
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
              placeholder="Enter Hotel Description"
              className="form-control"
              value={content}
            />
          </div>
          <div className="col-12 mb-3">
            <label for="" class="mb-1">
              Hotel Location:
            </label>
            <AlgoliaPlaces
              className="form-control ml-2 mr-2"
              placeholder="Enter Hotel Location"
              defaultValue={location}
              options={config}
              onChange={({ suggestion }) => setLocation(suggestion.value)}
              style={{ height: "50px" }}
            />
          </div>
          <div className="col-12 mb-3">
            <label for="" class="mb-1">
              Hotel Price:
            </label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="Enter Hotel Price"
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
              placeholder="Enter Number of Beds"
              className="form-control"
              value={bed}
            />
          </div>
          <div className="col-12 mb-3">
            <div className="row no-gutters ">
              <div class=" col-md-5 ">
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
              <div class=" col-md-5">
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
          <div className="col-12 col-lg-4 pt-3 pb-5">
            <button className="btn btn-block btn-lg btn-outline-primary w-100">
              Save Hotel
            </button>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <>
      <div className="container fluid pt-5 text-center">
        <h3>Add Hotel</h3>
      </div>
      <div className="container-fluid">
        <div className="row no-gutters pt-5">
          <div className="col-md-6">
            <div className="row no-gutters">
              <div className="col-9 mx-auto text-center">
                <img
                  src={preview}
                  alt="preview_image"
                  className="img img-fluid"
                />
              </div>
              <div className="col-9 col-md-7 mx-auto">
                <label className="btn btn-outline-secondary btn-block text-left w-100 my-4 mt-md-5 mb-md-0">
                  Upload Hotel Image
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-5">{hotelForm()}</div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
