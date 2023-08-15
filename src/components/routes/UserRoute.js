import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

function UserRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
}

export default UserRoute;
//here in this file we are protecting the routes with the help of redux state i.e
// if non logged in user tries to access some other routes then he will be redirected to login page
// if user and token not available then niklo pehli fursat main (login page pe :P)

// *****dont quote me on above statement, i write comments for my personal understanding and involvement
// in production code this will be cleaned
