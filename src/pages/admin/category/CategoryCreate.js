import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminRoute";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const { confirm } = Modal;
function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // 63 searching/filtering step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);
  // independant function to load all categories from db
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log("CATEGORY CREATION ERR", err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug, name) => {
    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleOutlined />,
      content: name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setLoading(true);
        removeCategory(slug, user.token)
          .then((res) => {
            setLoading(false);
            toast.warning(`${res.data.name} deleted `);
            loadCategories();
          })
          .catch((err) => {
            console.log("CATEGORY DELETION ERR", err);
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
            <h4>Create Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* step2  search */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />

          {/* step 5 apply - filter(searched(keyword)) - before map*/}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}{" "}
              <span
                onClick={() => handleRemove(c.slug, c.name)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;
