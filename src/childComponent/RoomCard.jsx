import React, { useState } from "react";
import "./RoomCard.css";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
// import BookingScreen from "../component/BookingScreen";

const RoomCard = ({ room, fromDate, toDate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs mb-4">
      <div className="col-md-4">
        <img src={room.imgUrl} alt="image1" className="smallimg mb-2 mt-2" />
      </div>
      <div className="col-md-7 detail">
        <h1 className="mt-2">{room.name}</h1>
        <b className="mt-8">
          {" "}
          <p>Phone Number : {room.phoneNumber}</p>
          <p>Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link
              to={`/book/${room.id}/${fromDate}/${toDate}`}
              className="btn btn-primary m-2"
            >
              {" "}
              Boook Now
            </Link>
          )}

          <button className="btn btn-primary mt-7" onClick={handleShow}>
            view Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>

        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100 bigimg"
              src={room.imgUrl}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Modal.Body>{room.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoomCard;
