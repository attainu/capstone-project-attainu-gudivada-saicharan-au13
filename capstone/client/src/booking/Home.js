import { useState, useEffect } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };
  return (
    <>
      <div className="container-fluid pt-5 text-center">
            <div className="row no-gutters justify-content-center">
                <div className="col-12">
                    <h3 class="text-uppercase">All hotels</h3>
                </div>
                <div className="col-md-7">
                    <br />
                    <Search />
                </div>
            </div>
      </div>
      <div className="container-fluid">
        <br />
        {/* <pre>{JSON.stringify(hotels,null,4)}</pre>*/}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;
