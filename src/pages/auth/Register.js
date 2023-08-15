import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FormWrapper } from "./authStyles";
import { Button } from "antd";

function Register({ history }) {
  const [email, setEmail] = useState("");

  // below code for not letting logged in user to access forgot password page
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // do not reload browser
    const regURL = process.env.REACT_APP_REGISTER_REDIRECT_URL;
    const config = {
      url: regURL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}, Click the link to complete your registration`
    );

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    //clear state
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter Your Email"
        />
      </div>
      {/* <button type="submit" className="btn btn-raised">
        Register
      </button> */}
      <Button type="primary" size={"large"} onClick={handleSubmit}>
        Register
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <FormWrapper className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </FormWrapper>
      </div>
    </div>
  );
}

export default Register;
