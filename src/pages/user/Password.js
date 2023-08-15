import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function Password() {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isValidPass, setIsValidPass]= useState(false);
  const [loading, setLoading] = useState(false);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);
    //firebase will give current user
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        // when successful updation of password
        setLoading(false);
        toast.success("Updated your password");
        // cleanup input field password after updation
        setPassword("");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
        console.log("UPDATE PASSWORD ERROR: ", err);
      });
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-goup">
        <label>Your Password</label>
        <input
          type="password"
          onChange={getPassword}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
                />
        <input
          type="password"
          onChange={confirmPassword}
          className="form-control"
          placeholder="Enter password again"
          disabled={loading}
                 />
          {confirmPass && <label className="danger">{confirmPass}</label>}

        {/* very clever move here - in above input i kept disabled loading beacause
         From the moment user submits a password - and it successfully updates in db
         in mean time user should not play with password input (it can create a mess)
         to avoid this i kept disabled true while loading
         similary in below code - submit button should be available on when user has entered pass
         word in above input and loading is false - so that user cannot go crazy and click submit 
         multiple times and mess the request */}
        {isValidPass && <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading }
        >
          Submit
        </button>}
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-info">Updating the Password...</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm()}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Password;
