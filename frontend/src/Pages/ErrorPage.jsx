import React from "react";
import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
  // const error = useRouteError();
  // console.log(error);

  return (
    <>
      <h1>404</h1>
      <h1>WE ARE SORRY, PAGE NOT FOUNT!</h1>
      <h3>
        Oops! An Occurred error occurred. Please check the URL or go back to
        home.
      </h3>
      <NavLink to="/">
        <button className="btn border-t-pink-950">Go To Home</button>
      </NavLink>
    </>
  );
};
