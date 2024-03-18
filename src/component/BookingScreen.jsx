import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../childComponent/RoomCard.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const BookingScreen = ({ match }) => {
  const Data = useParams();
  const id = Data.roomid;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const fromDate = moment(Data.fromDate, "DD-MM-YYYY");
  const toDate = moment(Data.toDate, "DD-MM-YYYY");
  const totalDay = moment.duration(toDate.diff(fromDate)).asDays() + 1;
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `http://localhost:8600/api/hotels/${id}`
        );
        setRoom(result.data);
        setTotalAmount(result.data.rentPerDay * totalDay);
        setLoading(false);
        // console.log(result);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBooking = function () {
    const booking = {
      userId: JSON.parse(localStorage.getItem("currentUser")).data.user.id,
      hotelId: parseInt(id),
      fromDate: Data.fromDate,
      toDate: Data.toDate,
      totalAmount,
      totalDays: moment.duration(toDate.diff(fromDate)).asDays() + 1,
    };
    axios
      .post("http://localhost:8600/api/bookings", booking)
      .then((result) => {
        console.log(result);
        alert("booked successfully");
        Navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {loading ? (
        <h1>...loading</h1>
      ) : error ? (
        <h1>ERROR</h1>
      ) : (
        <div className="m-5">
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imgUrl} className="bigimg" alt="" />
            </div>
            <div className="col-md-6 ">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name :{room.name}</p>
                  <p>From Date :{Data.fromDate}</p>
                  <p>To Date :{Data.toDate}</p>
                  <p>Type :{room.type}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days : {totalDay}</p>
                  <p>Rent per Day : {room.rentPerDay}</p>
                  <p>Total Amount :{totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={handleBooking}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingScreen;
