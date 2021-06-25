import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {  Select } from "antd";
import DatePicker from 'react-datepicker';
import { read,updateHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import HotelEditForm from "../components/forms/HotelEditForm";

const { Option } = Select;

const EditHotel = ({ match }) => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",    
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [image,setImage]=useState('');
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  // destructuring variables from state
  const { title, content, price, from, to, bed, location } = values;

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    // console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("starDate", from);
    hotelData.append("enDate", to);
    hotelData.append("bed", bed);

    try {
      let res = await updateHotel(token, hotelData, match.params.hotelId);
      console.log("HOTEL UPDATE RES", res);
      toast.success(`${res.data.title} is updated`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);    
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
        <div className="container-fluid pt-5 text-center">
          <div className="row no-gutters">
            <div className="col-12">
                <h3>Edit Hotel</h3>
            </div>
          </div>
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
                      Re-Upload Hotel Image
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
            <div className="col-md-5">
              <HotelEditForm
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
    </>
  );
};


export default EditHotel;