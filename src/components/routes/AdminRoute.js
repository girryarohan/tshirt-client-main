import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current admin res", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
}

export default AdminRoute;
//here in this file we are protecting the routes with the help of redux state and +++db call i.e
// two layer of check - 1. check in redux state + 2. with db call to check if user is admin or not

// if non logged in user tries to access some other routes then he will be redirected to login page
// if user and token not available then niklo pehli fursat main (login page pe :P)

// *****dont quote me on above statement, i write comments for my personal understanding and involvement
// in production code this will be cleaned
