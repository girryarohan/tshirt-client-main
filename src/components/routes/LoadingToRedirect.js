import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  let history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      //
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect once count is equal to 0
    count === 0 && history.push("/");
    //cleanup
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <p>Processing your request</p>
      <p>Redirecting you in {count} seconds</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default LoadingToRedirect;
