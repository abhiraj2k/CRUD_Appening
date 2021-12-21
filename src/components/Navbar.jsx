import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

const Navbar = ({ isAuth, signOutHandler, query, setQuery }) => {
  return (
    <div className="nav">
      <div className="nav__content">
        <div className="nav__left">LOGO</div>
        <div className="nav__mid">
          <div className="nav__search">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>
        <div className="nav__right">
          {!isAuth ? (
            <>
              <Link to="/signin" className="nav__item --signin">
                Sign in
              </Link>
              <Link to="signup" className="nav__item --signup">
                Sign up
              </Link>
            </>
          ) : (
            <div className="nav__item --signout" onClick={signOutHandler}>
              Sign out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
