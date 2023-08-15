import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubcategories } from "../../functions/subcategory";

function SubList() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubcategories().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/subcategory/${s.slug}`}>{s.name}</Link>
      </div>
    ));
  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-danger">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
}

export default SubList;
