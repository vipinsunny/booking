import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import "./home.css";
import rooms from "../../rooms.json";
import Footer from "../../components/footer/Footer.jsx"

const Home = () => {
    
  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        <h1 className="homeTitle">Available Rooms</h1>
        <div className="roomBoxes">
          {rooms.map((room) =>
            // Conditionally render the Link only for available rooms
            room.status === "Available" ? (
              <Link
                key={room.room}
                to={`/booking/${room.room}`}
                className="roomBox"
              >
                <h3>{room.room}</h3>
                <p className={`status ${room.status.toLowerCase()}`}>
                  Status: {room.status}
                </p>
              </Link>
            ) : (
              // Display room information without Link for booked rooms
              <div key={room.room} className="roomBox">
                <h3>{room.room}</h3>
                <p className={`status ${room.status.toLowerCase()}`}>
                  Status: {room.status}
                </p>{" "}
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
