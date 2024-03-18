import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBooking = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userId = parseInt(user.data.user.id);
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8600/api/bookings/history/${userId}`
        );
        console.log(result.data);
        setBookingList(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooking();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {bookingList.map((booking) => {
            return (
              <div className="bs">
                <h1>{booking.hotelName}</h1>
                <p>
                  <b>checkIn</b> : {booking.fromDate}
                </p>
                <p>
                  <b>checkOut</b> : {booking.toDate}
                </p>
                <p>
                  <b>Amount</b> : {booking.totalAmount}
                </p>
                <p>
                  <b>Status </b> :{" "}
                  {booking.status == "booked" ? "Confirmed" : "Cancel"}
                </p>
                {/* <div className="text-right">
                  <button className="btn btn-primary">cancel Booking</button>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
