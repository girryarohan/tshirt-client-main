import axios from "axios";

// we are sending token in the header in below function
// we kept body empty i.e second argument of post method
// third parameter is the header
export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
//41 on refresh on webpage get user info in redux state - from db findOne call
export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

// admin routes
export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
