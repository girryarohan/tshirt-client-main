import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import "./categoryStyles.css";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));
  const showAllCategories = () =>
    categories.map((c) => (
      <div key={c._id} className="cardStyle">
        <Link to={`/category/${c.slug}`} style={{ textDecoration: "none" }}>
          <Card
            key={c._id}
            hoverable
            style={{ width: 240 }}
            className=""
            // cover={
            //   <img
            //     alt="example"
            //     src={`../../images/catgories/${c.slug}.webp`}
            //   />
            // }
          >
            <Meta title={c.name} />
          </Card>
        </Link>
      </div>
    ));
  return (
    <div className="container">
      <div className="row categoryCard">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          showAllCategories()
        )}
      </div>
    </div>
  );
}

export default CategoryList;
