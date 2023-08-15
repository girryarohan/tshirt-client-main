import React from "react";

function AboutMe() {
  return (
    <div className="container-fluid p-5 mb-5">
      <div className="row">
        <div className="col-md-6 col-lg-6 text-center">
          {" "}
          <img
            src="https://pbs.twimg.com/profile_images/1283302395951243264/Rfq-bfLU_400x400.jpg"
            class="rounded-circle border border-info custom-border profilePic"
            alt="Rohan Arote"
            width="250"
            height="250"
          />{" "}
        </div>
        <div className="col-md-6 col-lg-6 pt-5">
          <div className="row">
            <p className="h6 text-info">Full Stack Developer</p>
          </div>

          <div className="row">
            <p className="h1 text-dark text-uppercase">
              <b>Rohan Arote</b>
            </p>
          </div>
          <div className="row">
            <p className="text-light badge bg-info">React Js</p>
            &nbsp;
            <p className="text-light badge bg-warning">Node Js</p>
            &nbsp;
            <p className="text-light badge bg-dark">Express Js</p>
            &nbsp;
            <p className="text-light badge bg-primary">Mongo DB</p>
            &nbsp;
            <p className="text-light badge bg-danger">Java J2EE</p>
          </div>
          <div className="row">
            <button className="btn btn-outline-info">
              <a href="mailto:rohanarote@live.com">Contact Me</a>
            </button>{" "}
            &nbsp; &nbsp;
            <button className="btn btn-outline-info">
              {" "}
              <a
                href="https://www.rostudio.in"
                target="_blank"
                rel="noreferrer"
              >
                View Portfolio
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
