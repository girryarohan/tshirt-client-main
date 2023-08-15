import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminRoute";
import { createProduct } from "../../../functions/product";
import { Modal, Spin } from "antd";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "Spark - U Series",
  description: "this is best",
  price: "4566776",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "100",
  images: [],
  colors: ["Black", "White", "Blue", "Gold", "Silver"],
  brands: ["U-Series", "Z-Series"],
  color: "Black",
  brand: "U-Series",
};
function ProductCreate({ history }) {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // independant function to load all categories from db
  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        Modal.info({
          title: `"${res.data.title}" is created`,
          onOk() {
            history.push("/admin/products");
          },
        });
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    //
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log([e.target.name] + "  HELLO  " + e.target.value);
  };

  const handleCategoryChange = (e) => {
    //
    e.preventDefault();
    console.log("SELECTED CATEGORY ID", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <Spin tip="Uploading..." className="pt-3" />
          ) : (
            <h4>Product Create</h4>
          )}
          <hr />
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
