import currencyFormatter from "react-currency-format";
import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();

  return (
    <div className="col-12 col-md-8 mx-auto">
      <div className="card mb-4 hotel-card">
        <div className="row no-gutters">
          <div className="col-md-6">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                alt="default hotel img"
                className="hotel-main-img card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel img"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h4 className="text-left">
                {h.title} <span className="float-right text-primary"></span>{" "}
              </h4>
              <p className="text-grey"> 
              <span className="d-inline-block mg-r-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ccc" width="20" height="20" viewBox="0 0 14 20"><path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z"></path></svg>
              </span>
              {h.location}</p>
              <p className="card-text mb-2 hotel-desc">{`${h.content.substring(1, 200)}...`}</p>
              <p className="card-text mb-1">
                <span className="float-right text-primary">
                  for {diffDays(h.starDate, h.enDate)}{" "}
                  {diffDays(h.starDate, h.enDate) <= 1 ? "day" : "days"}
                </span>
              </p>
              <p className="card-text mb-1">{h.bed} bed</p>
              <p className="card-text mb-1">
                Available from {new Date(h.starDate).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-between align-items-center mt-3">
                  {showViewMoreButton && (
                    <button
                      onClick={() => history.push(`/hotel/${h._id}`)}
                      className="btn btn-primary"
                    >
                      Show more
                    </button>
                  )}
                  {owner && (
                    <>
                      <Link to={`/hotel/edit/${h._id}`}>
                        <EditOutlined className="text-warning" />
                      </Link>
                      <DeleteOutlined
                        onClick={() => handleHotelDelete(h._id)}
                        className="text-danger"
                      />
                    </>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
