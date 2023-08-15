import React from "react";
import {
  LinkedinFilled,
  InstagramFilled,
  FacebookFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { useHistory } from "react-router-dom";

function Footer() {
  //router
  let history = useHistory();
  return (
    <footer className="bg-light text-dark text-left text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-info">About eCom.in</h5>

            <p>
              India’s Ultimate Online Shopping Site eCom.in vision is to create
              India’s most reliable and frictionless commerce ecosystem that
              creates life-changing experiences for buyers and sellers.This
              e-commerce never shuts down.
            </p>
            <img
              src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/payment-method_7934bc.svg"
              alt="All payments accepted"
            />
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-left text-info">Get to Know Us</h5>

            <ul className="list-unstyled mb-0 text-left">
              <li>
                <a
                  className="text-dark"
                  onClick={() => history.push("/aboutme")}
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="mailto:rohanarote@live.com" className="text-dark">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://www.rostudio.in" className="text-dark">
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://www.buymeacoffee.com/girryarohan"
                  className="text-dark"
                >
                  Buy us a coffee
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-left text-info">Connect With Us</h5>

            <ul className="list-unstyled text-left">
              <li>
                <a
                  href="https://www.linkedin.com/in/rohanarote/"
                  className="text-dark"
                >
                  <LinkedinFilled /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rohan.arote/"
                  className="text-dark"
                >
                  <InstagramFilled /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/rohan.arote/"
                  className="text-dark"
                >
                  <FacebookFilled /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UC2D3J-dcoEOwv0go_i9QNQQ"
                  className="text-dark"
                >
                  <YoutubeFilled /> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="text-center text-dark p-3"
        style={{ backgroundColor: "#001529" }}
      >
        <Avatar
          src="https://t4.ftcdn.net/jpg/03/74/49/21/360_F_374492118_gchGRjXG6jajO3lfY7mcz2RdlKgFAiBg.jpg"
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
        />{" "}
        <span className="text-light">
          &nbsp; Designed and Developed by: © 2023{"  "}
        </span>
        <a className="text-info" href="https://www.rostudio.in">
          Cosmos Technologies
        </a>
      </div>
    </footer>
  );
}

export default Footer;
