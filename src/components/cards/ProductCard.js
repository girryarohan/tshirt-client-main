import React, { useEffect, useState } from "react";
import { Card, Tooltip } from "antd";
import {
  EyeOutlined,
  FundViewOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import noimage from "../../images/noimage.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
//import { storage } from "../../firebase";
const { Meta } = Card;
function ProductCard({ product }) {
  const [tooltip, setTooltip] = useState("Click to add");
  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const myProducts = ["63fb23ae50455b4a2031a07c", "63fb230a50455b4a2031a07a"];
  const handleAddToCart = () => {
    //create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in localStorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  /*temp code 

  useEffect(() => {
    storage
      .ref("files")
      .child("168036752162.png")
      .getDownloadURL()
      .then((url) => {
        console.log(url);
      });
    console.log("INT PRODUCT CARD USEEFFECT");
  });
   temp code end */
  // destructure
  const { title, description, images, slug, price } = product;

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        hoverable
        cover={
          <img
            src={images && images.length ? images[0].url : noimage}
            alt={title}
            style={{ height: "300px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-info" />
            <br />
            View Product
          </Link>,
          // <Tooltip title={tooltip}>
          //   <a
          //     onClick={handleAddToCart}
          //     disabled={myProducts.includes(product._id)}
          //   >
          //     {myProducts.includes(product._id) ? (
          //       <FundViewOutlined />
          //     ) : (
          //       <ShoppingCartOutlined className="text-danger" />
          //     )}
          //     <br />
          //     {myProducts.includes(product._id) ? "View File" : "Add to Cart"}
          //   </a>
          // </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - ₹${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard;
