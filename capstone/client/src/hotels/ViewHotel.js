import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import { read, diffDays } from "../actions/hotel";
import moment from "moment";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ViewHotel = ({ match, history }) => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);
  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    // console.log(res);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!auth) history.push("/login");
    console.log("");
  };

  async function handleToken(token) {
    // console.log({ token, addresses })
    const response = axios.post("https://xp6ge.sse.codesandbox.io/", {
      token,
      setHotel,
    });
    // const { status } = response.data
    // if (status === 'success') {
    //   toast('success! check emails for details',
    //     { type: 'success' })

    // } else {
    //   toast("something went wrong",
    //     { type: "error" })
    // }
  }

  return (
    <>
      <div className="container-fluid py-5 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row no-gutters justify-content-center">
          <div className="col-md-5">
            <img src={image} alt={hotel.title} className="img img-fluid hotel-main-img" />
          </div>
          <div className="col-md-6">
            <p class="mt-3 mt-md-0"><strong>{hotel.content}</strong></p>
            <p className="h4 mt-4">INR ₹{hotel.price}/- Only</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.starDate, hotel.enDate)}{" "}
                {diffDays(hotel.starDate, hotel.enDate) <= 1 ? "day" : "days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.starDate)).format(
                "MMMM Do YYYY,h:mm:ss a"
              )}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.enDate)).format("MMMM Do YYYY,h:mm:ss a")}
            </p>

            <button
              onClick={handleClick}
              className="btn btn-block btn-lg book-btn btn-primary mt-md-3 mb-3 mb-md-0"
            >
              {auth && auth.token ? "Book Now" : "Login to Book"}
              <StripeCheckout
                stripeKey="pk_test_51Ia2LNSDOwdRoCaIrpFNgK88c9lBf6RYDhpU7XmQAWr3V6KJDIDre6PjeB9eWpJ9wunO6tbbIqIhKqoQOZcXMFRp00qV1vKxrx"
                token={handleToken}
                billingAddress
                shipingAddress
                amount={hotel.price * 100}
                name={setHotel.name}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
