import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminRoute";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { confirm } = Modal;

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug, title) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: title,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(slug);
        setLoading(true);
        removeProduct(slug, user.token)
          .then((res) => {
            setLoading(false);
            toast.error(`${res.data.title} deleted `);
            loadAllProducts();
          })
          .catch((err) => {
            console.log("PRODUCT DELETION ERR", err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
          });
      },
      onCancel() {
        console.log("Cancelled delete operation");
      },
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-primary">All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              // below is wrapper component and it always requires key
              <div className="col-md-4 pb-3" key={product._id}>
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
