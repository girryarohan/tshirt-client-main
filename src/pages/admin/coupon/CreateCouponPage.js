import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminRoute";
import { Modal } from "antd";
const { confirm } = Modal;
function CreateCouponPage() {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);
  // redux
  const { user } = useSelector((state) => ({ ...state }));
console.log("expiry", expiry);
  useEffect(() => {
    loadAllCoupons();
  }, []);
  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table(name, expiry, discount);
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
        loadAllCoupons();
      })
      .catch((err) => console.log("create coupon failed FE", err));
  };
  const handleRemove = (couponId, name) => {
    confirm({
      title: "Are you sure delete this coupon?",
      icon: <ExclamationCircleOutlined />,
      content: name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setLoading(true);
        removeCoupon(couponId, user.token)
          .then((res) => {
            setLoading(false);
            toast.error(`${res.data.name} deleted `);
            loadAllCoupons();
          })
          .catch((err) => {
            console.log("COUPON DELETION ERR", err);
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
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>

              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount % </label>

              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
          </form>
          <br />

          <h4>{coupons.length} Coupons</h4>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount} %</td>
                  <td>
                    <DeleteOutlined
                      className="text-danger pointer"
                      onClick={() => handleRemove(c._id, c.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateCouponPage;
