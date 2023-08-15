import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isValidPass, setIsValidPass]= useState(false);
  function getPassword(event) {
    setPassword(event.target.value);
    console.log(password);
    confirmPassword(event);
  }
  function confirmPassword(event) {
    let val = event.target.value;
    console.log(confirmPass);
    if (password === val) {
      console.log(confirmPass);
      setConfirmPass("");
      setIsValidPass(true);
      // setConfirmPass("Password matched");
    } else {
      console.log(confirmPass);
      setIsValidPass(false);

      setConfirmPass("password dont match");
    }
  }
  // below code for not letting logged in user to access forgot password page

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // do not reload browser

    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // following will check if the user email is verified or not
      // so that unathorized access to page and unathorized email cannot set its password
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        // redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        //redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <input type="email" className="form-control" value={email} disabled />
        {/* disabled not added to email input to prevent deadlock because of browser local storage cache clear*/}
        {/* eg. if user enters email and clears browser cache and come back via email link then email will be undefined */}
       
         <input
          type="password"
          onChange={getPassword}
          autoFocus
          className="form-control"
          placeholder="Enter new password"
                />
        <input
          type="password"
          onChange={confirmPassword}
          className="form-control"
          placeholder="Enter password again"
                 />
          {confirmPass && <label className="danger">{confirmPass}</label>}

      </div>{isValidPass &&
      <button type="submit" className="btn btn-raised">
        Complete
      </button>}
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>

          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
