import React, { useState, useEffect } from "react";
import "./booking.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import rooms from "../../rooms.json";
import timeSlots from "../../timeSlots.json";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../components/footer/Footer"
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTimeSlot, setEditedTimeSlot] = useState("");

  // Load booked slots from local storage on component mount
  useEffect(() => {
    const bookedSlotsFromLocalStorage = JSON.parse(
      localStorage.getItem("bookedSlots")
    );
    if (bookedSlotsFromLocalStorage) {
      setBookedSlots(bookedSlotsFromLocalStorage);
    }
  }, []);

  // Function to get unavailable time slots for a given room
  const getUnavailableTimeSlots = (room) => {
    return bookedSlots
      .filter((booking) => booking.room === room)
      .map((booking) => booking.timeSlot);
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
    // Reset the selected time slot when changing the room
    setSelectedTimeSlot("");
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleBooking = () => {
    if (selectedRoom && selectedTimeSlot) {
      const isConflict = bookedSlots.some(
        (booking) =>
          booking.room === selectedRoom && booking.timeSlot === selectedTimeSlot
      );

      if (isConflict) {
        // Show an error toast if there's a booking conflict
        toast.error("This time slot is already booked for the selected room.");
      } else {
        const newBooking = {
          room: selectedRoom,
          timeSlot: selectedTimeSlot,
        };
        const updatedBookedSlots = [...bookedSlots, newBooking];

        // Save the updated booked slots in local storage
        localStorage.setItem("bookedSlots", JSON.stringify(updatedBookedSlots));

        setBookedSlots(updatedBookedSlots);

        // Show a success toast for a successful booking
        toast.success("Booking successful!");

        setSelectedRoom("");
        setSelectedTimeSlot("");
      }
    } else {
      // Show an error toast if room and/or time slot are not selected
      toast.error("Please select a room and a time slot.");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTimeSlot(bookedSlots[index].timeSlot); // Set the initial edited time slot
  };

const handleSave = (index) => {
  // Update the booking with the edited time slot
  const updatedBookings = [...bookedSlots];
  updatedBookings[index].timeSlot = editedTimeSlot;

  // Save the updated bookings in local storage
  localStorage.setItem("bookedSlots", JSON.stringify(updatedBookings));

  // Reset the edit state
  setEditIndex(null);

  // Show a success toast for editing
  toast.success("Booking edited successfully!");
};

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

 const handleDelete = (index) => {
   // Delete the booking at the specified index
   const updatedBookings = [...bookedSlots];
   updatedBookings.splice(index, 1);

   // Save the updated bookings in local storage
   localStorage.setItem("bookedSlots", JSON.stringify(updatedBookings));

   // Update the state
   setBookedSlots(updatedBookings);

   // Show a success toast for deleting
   toast.success("Booking deleted successfully!");
 };

  return (
    <div>
      <Navbar />
      <div className="bookingContainer">
        <h1 className="bookingTitle">Book a Room</h1>
        <div className="bookingForm">
          <label>
            Select a Room:
            <select value={selectedRoom} onChange={handleRoomChange}>
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.room}>
                  {room.room}
                </option>
              ))}
            </select>
          </label>
          {selectedRoom !== "Room Mermaid" && ( // Render time slot select only if room is not "Room Mermaid"
            <label>
              Select a Time Slot:
              <select
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                disabled={
                  selectedRoom === "Room Mermaid" &&
                  bookedSlots.some(
                    (booking) =>
                      booking.room === "Room Mermaid" &&
                      booking.timeSlot === selectedTimeSlot
                  )
                }
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option
                    key={slot}
                    value={slot}
                    disabled={
                      selectedRoom === "Room Mermaid" &&
                      bookedSlots.some(
                        (booking) =>
                          booking.room === "Room Mermaid" &&
                          booking.timeSlot === slot
                      )
                    }
                  >
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button onClick={handleBooking}>Book Room</button>
        </div>

        <div className="userBookings">
          <h2>Your Bookings</h2>
          <ul>
            {bookedSlots.map((booking, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <div>
                    Room: {booking.room}, Time Slot:{" "}
                    <select
                      value={editedTimeSlot}
                      onChange={(e) => setEditedTimeSlot(e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <button
                      className="save-button"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                    <button
                      className="delete-button" //Apply the delete-button class
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div>
                    Room: {booking.room}, Time Slot: {booking.timeSlot}
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button" // Apply the delete-button class
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Booking;
