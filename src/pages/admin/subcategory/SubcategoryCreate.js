import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminRoute";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import {
  createSubcategory,
  getSubcategories,
  removeSubcategory,
} from "../../../functions/subcategory";

const { confirm } = Modal;
function SubcategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  //parent category
  const [category, setCategory] = useState("");
  // 63 searching/filtering step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);
  // independant function to load all categories from db
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubcategories = () =>
    getSubcategories().then((sc) => setSubcategories(sc.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubcategory({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubcategories();
      })
      .catch((err) => {
        console.log("SUBCATEGORY CREATION ERR", err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug, name) => {
    confirm({
      title: "Are you sure delete this subcategory?",
      icon: <ExclamationCircleOutlined />,
      content: name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setLoading(true);
        removeSubcategory(slug, user.token)
          .then((res) => {
            setLoading(false);
            toast.warning(`${res.data.name} deleted `);
            loadSubcategories();
          })
          .catch((err) => {
            console.log("SUBCATEGORY DELETION ERR", err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
          });
      },
      onCancel() {
        console.log("Cancelled delete operation");
      },
    });
  };

  // step 4 return if keyword includes in name
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Create Subcategory</h4>
          )}

          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select Category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* step2  search */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />

          {/* step 5 apply - filter(searched(keyword)) - before map*/}
          {subcategories.filter(searched(keyword)).map((sc) => (
            <div className="alert alert-secondary" key={sc._id}>
              {sc.name}{" "}
              <span
                onClick={() => handleRemove(sc.slug, sc.name)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/subcategory/${sc.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubcategoryCreate;
