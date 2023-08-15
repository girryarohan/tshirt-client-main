import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../images/404.jpg";

function NotFoundPage() {
  return (
    <div className="text-center">
      {" "}
      <img src={errorImg} alt="404 Img" />
      <br />
      <p
        style={{ textAlign: "center" }}
        className="btn btn-raised btn-info text-white"
      >
        <Link to="/" className="text-white">
          Go to Home{" "}
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
