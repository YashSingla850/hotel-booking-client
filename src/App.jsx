import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";
import BookingScreen from "./component/BookingScreen";
import Navbar from "./childComponent/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileScren from "./component/ProfileScren";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/book/:roomid/:fromDate/:toDate"
            element={<BookingScreen />}
          ></Route>
          <Route path="/booking-list" element={<ProfileScren />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
