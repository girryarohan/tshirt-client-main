import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import CategoryList from "../components/category/CategoryList";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import SubList from "../components/sub/SubList";
import { Carousel } from "antd";
import ad1 from "../images/1.webp";
import ad2 from "../images/2.webp";
import ad3 from "../images/3.webp";
import ad4 from "../images/4.webp";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Footer from "../components/footer/Footer";

function Home() {
  const contentStyle = {
    height: "420px",
    width: "100%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const settings = {
    slidesToScroll: 1,
    nextArrow: <ArrowLeftOutlined />,
    prevArrow: <ArrowRightOutlined />,
  };
  const JumbotronWrapper = styled.div`
    color: #f9004d !important;
    background: #f6f6f6 !important;
    letter-spacing: 4px;
  `;
  return (
    <>
      {/* <div className="h1 font-weight-bold text-danger display-5 text-center pb-2 pt-2 mb-0">
        <Jumbotron
          text={[
            "SUMMER SALE IS LIVE",
            "NEW ARRIAVALS",
            "LATEST DESIGNS",
            "WIDE RANGE OF CATEGORIES",
          ]}
        />
      </div> */}
      <Carousel autoplay {...settings}>
        <img style={contentStyle} src={ad1} alt="1" />
        <img style={contentStyle} src={ad2} alt="1" />
        <img style={contentStyle} src={ad3} alt="1" />
        <img style={contentStyle} src={ad4} alt="1" />
      </Carousel>

      <JumbotronWrapper className="text-center p-3 h3 display-5 font-weight-bold ">
        NEW ARRIAVALS
      </JumbotronWrapper>
      <NewArrivals />
      <br />
      <JumbotronWrapper className="text-center p-3 h3 display-5 font-weight-bold ">
        OUR BEST SELLERS
      </JumbotronWrapper>
      <BestSellers />
      <br />
      <JumbotronWrapper className="text-center p-3 h3 display-5 font-weight-bold ">
        SHOP BY CATEGORIES
      </JumbotronWrapper>
      <CategoryList />
      <JumbotronWrapper className="text-center p-3 h3 display-5 font-weight-bold ">
        WIDE RANGE IN SPORTS
      </JumbotronWrapper>
      <SubList />
      <Footer />
    </>
  );
}

export default Home;
