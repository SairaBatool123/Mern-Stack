import React from "react";
import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
  // const error = useRouteError();
  // console.log(error);

  return (
    <>
      <div className="text-center mt-50">
        <h1 className="text-6xl font-bold mb-3">404</h1>
        <h1>WE ARE SORRY, PAGE NOT FOUND!</h1>
        <h3>
          Oops! An Occurred error occurred. Please check the URL or go back to
          home.
        </h3>
        <NavLink to="/">
          <button className="mt-3 w-40 bg-fuchsia-800 text-white py-2 rounded-xl font-semibold transition duration-300">
            Go To Home
          </button>
        </NavLink>
      </div>
    </>
  );
};
