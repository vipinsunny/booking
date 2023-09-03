// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Booking from "./pages/booking/Booking.jsx";
// import ViewBookings from "./pages/viewbookings/ViewBookings.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:room" element={<Booking />} />{" "}
        {/* Include roomId parameter */}
        {/* <Route path="/view-bookings" element={<ViewBookings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
