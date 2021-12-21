import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../styles/signin.scss";
import Loader from "./Loader";

const SignIn = ({ isAuth, signinHandler, loading }) => {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     clearSigninDetails();
  //     console.log(isAuth);
  //     if (isAuth) {
  //       navigate("/");
  //     }
  //   }, [isAuth]);

  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState();

  const clearSigninDetails = () => {
    const signinObj = {
      email: "",
      password: "",
    };
    setSigninDetails(signinObj);
  };
  const handleOnFormSubmit = (e) => {
    setErrorMsg("");
    e.preventDefault();
    const { email, password } = signinDetails;
    if (!email || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }
    const regEx = /^\w+([.\-_]?\w+)*@\w+([.\w]+)*(\.\w{2,3})+$/;
    const isValid = regEx.test(email);
    if (!isValid) {
      setErrorMsg("Incorrect email format");
      return;
    }
    signinHandler(signinDetails);
    clearSigninDetails();
  };

  return (
    <div className="signin">
      {loading ? (
        <Loader />
      ) : (
        <form className="signin__form" onSubmit={handleOnFormSubmit}>
          <div className="signin__title">Sign in</div>
          <div className="signin__block email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              name="email"
              value={signinDetails.email}
              onChange={(e) =>
                setSigninDetails({ ...signinDetails, email: e.target.value })
              }
            />
          </div>
          <div className="signin__block password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={signinDetails.password}
              onChange={(e) =>
                setSigninDetails({ ...signinDetails, password: e.target.value })
              }
            />
          </div>

          <div className="error">{errorMsg}</div>
          <button className="signin__button" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
