import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/home.scss";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ErrorModal from "./ErrorModal";
import SearchResults from "./SearchResults";
const Home = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    saveUsers();
    const isLoggedIn = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : -1;
    if (isLoggedIn !== -1) {
      setIsAuth(true);
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, []);

  const saveUsers = () => {
    const temp = !localStorage.getItem("users")
      ? []
      : JSON.parse(localStorage.getItem("users"));
    setUsers(temp);
  };

  const handleSignIn = (userDetails) => {
    const tempUsers = users;
    const userExist = tempUsers.findIndex(
      (item) => item.email === userDetails.email
    );
    if (userExist < 0) {
      setError("User Does Not Exist");
      return;
    }
    if (userDetails.password !== tempUsers[userExist].password) {
      setError("Password Does Not Match");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(tempUsers[userExist]));
    setIsAuth(true);
    navigate("/");
  };

  const handleSignUp = (userDetails) => {
    const tempUsers = users;
    const userExist = tempUsers.findIndex(
      (item) => item.email === userDetails.email
    );
    if (userExist >= 0) {
      setError("User Already Exists");
      return;
    }
    tempUsers.push(userDetails);
    localStorage.setItem("users", JSON.stringify(tempUsers));
    localStorage.setItem("currentUser", JSON.stringify(userDetails));
    navigate("/");
  };
  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    console.log(isAuth);
    setIsAuth(false);
    navigate("/signin");
  };

  const handleUpdateUser = (userDetails) => {
    saveUsers();
    const tempUsers = users.map((user) => {
      if (user.email === userDetails.email) {
        return userDetails;
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(tempUsers));
    saveUsers();
  };
  return (
    <div className="home">
      <Navbar
        isAuth={isAuth}
        signOutHandler={handleSignOut}
        query={query}
        setQuery={setQuery}
      />
      <SearchResults query={query} users={users} />
      {error && <ErrorModal error={error} clear={setError} />}
      <Routes>
        <Route
          path="/"
          element={<Dashboard updateHandler={handleUpdateUser} />}
        />
        <Route
          path="signup"
          element={<SignUp isAuth={isAuth} signUpHandler={handleSignUp} />}
        />
        <Route
          path="signin"
          element={<SignIn isAuth={isAuth} signinHandler={handleSignIn} />}
        />
      </Routes>
    </div>
  );
};
export default Home;
