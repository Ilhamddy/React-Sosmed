import { useDispatch, useSelector } from "react-redux";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
// import Register from '../pages/home'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { loginAction } from "../redux/slices/usersSlices";
import Profile from "../pages/Profile";
import Notfound from "../pages/notfound";
import ProfileDetail from "../pages/ProfileDetail";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.users.id);

  const keepLogin = () => {
    const data = localStorage.getItem("setStorage");
    const user = JSON.parse(data);
    if (data) {
      dispatch(loginAction(user));
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <Navbar />
      {/* <Footer /> */}
      <Routes>
        {!userLogin ? (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </>
        ) : null}

        {userLogin ? (
          <Route element={<ProfileDetail />} path="/profile/:id" />
        ) : null}
        <Route element={<Home />} path="/" />
        <Route element={<Profile />} path="/profile/:id" />
        <Route element={<Notfound />} path="/*" />

        <Route />
      </Routes>
    </>
  );
}

export default App;
