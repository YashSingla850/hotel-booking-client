import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "./RoomCard";
// import "antd/dist/antd.less";
import { DatePicker, Space } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const Body = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRoom, setDuplicateRoom] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const result = await axios.get("http://localhost:8600/api/hotels");
        setRooms(result.data);
        setDuplicateRoom(result.data);
        setLoading(false);
        console.log(result);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filterByDate = function (dates) {
    setFromDate(moment(new Date(dates[0])).format("DD-MM-YYYY"));
    setToDate(moment(new Date(dates[1])).format("DD-MM-YYYY"));
    // useEffect(() => {
    //   const fetchRoomWithDateFilter = async () => {
    //     try {
    //       const result = await axios.get(
    //         "http://localhost:8600/api/hotels/dateFilter",
    //         { fromDate, toDate }
    //       );
    //       // setDuplicateRoom(result.data);
    //       // setRooms(duplicateRoom);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   fetchRoomWithDateFilter();
    // }, []);
  };

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-7 mt-3 bs text-center font-weight-bold celender">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>...loading</h1>
        ) : error ? (
          <h1>ERROR</h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9">
                <RoomCard room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Body;
