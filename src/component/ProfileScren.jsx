import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import MyBooking from "../childComponent/MyBooking";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

const ProfileScren = () => {

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);


  return (
    <div className="m-4">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Booking List" key="1"> 
          <MyBooking />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScren;
