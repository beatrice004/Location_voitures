import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import NavbarLoginButtons from "./components/navbar/navbar-login-buttons";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import BookCars from "./pages/BookCarsPage";
import Rent from "./pages/RentPage";
import Profile from "./pages/ProfilePage";
import Dashboard from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import Users from "./admin/users/Users"
import Cars from "./admin/cars/Cars"
import Rents from "./admin/rents/Rents"
import DashboardLogin from "./pages/DashboardLogin";


function App() {

  return (
    <BrowserRouter>
      <Navbar>
        <NavbarLoginButtons />
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="/cars" element={<BookCars />} />
        <Route path="/cars/:id" element={<Rent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/login" element={<DashboardLogin />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Users />} />
          <Route path="/dashboard/cars" element={<Cars />} />
          <Route path="/dashboard/rents" element={<Rents />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
