import React, { useEffect, useState } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubcategories } from "../functions/subcategory";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  AntDesignOutlined,
  BgColorsOutlined,
  DownSquareOutlined,
  MonitorOutlined,
  StarOutlined,
  TagsOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState(["U-Series", "Z-Series"]
  );
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "White",
    "Blue",
    "Gold",
    "Silver",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();

    // fetch categories
    getCategories().then((res) => setCategories(res.data));

    // fetch subcategories
    getSubcategories().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1.load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
  // 2. load products on user search input
  useEffect(() => {
    // console.log("load products on user search input", text);
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset other filters
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // set price
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 800);
  };

  // 4. load products based on categories
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));
  // handle check for categories
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset other filters
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    // indexOf method - if found returns index else return -1
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1); // 1 is count of how many item from that index we want to splice (remove)
    }
    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
    if (inTheState.length < 1) {
      console.log("TEST SUCC");
      loadAllProducts();
    }
  };

  // 5.show products by star rating
  const handleStarClick = (num) => {
    //  console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset other filters
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // set star
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));
  const handleSub = (sub) => {
    // console.log(sub);
    setSub(sub);

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset other filters
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub: sub });
  };

  //  7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <>
        <Radio
          key={b}
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          className="pb-2 pl-4 pr-4"
        >
          {b}
        </Radio>
        <br />
      </>
    ));
  const handleBrand = (e) => {
    //
    setBrand(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset other filters
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // 8. show product based on color
  const showColors = () =>
    colors.map((c) => (
      <>
        <Radio
          key={c}
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          className="pb-2 pl-4 pr-4"
        >
          {c}
        </Radio>
        <br />
      </>
    ));
  const handleColor = (e) => {
    //
    setColor(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset other filters
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9.  show product based on shipping
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );
  const handleShippingChange = (e) => {
    setShipping(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // reset other filters
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    fetchProducts({ shipping: e.target.value });
  };
  const resetAllFilters = () => {
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");
    setBrand("");
    loadAllProducts();
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/ Filter</h4>
          <hr />
          <a className="float-right pr-2" onClick={resetAllFilters}>
            Reset All
          </a>
          <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <MonitorOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `₹${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="500000"
                />
              </div>
            </SubMenu>
            {/* categories */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-5px" }}>{showCategories()}</div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: "-5px" }}>{showStars()}</div>
            </SubMenu>
            {/* subcategories */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <TagsOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ marginTop: "-5px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>
            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <AntDesignOutlined /> Type
                </span>
              }
            >
              <div style={{ marginTop: "-5px" }}>{showBrands()}</div>
            </SubMenu>

            {/* color */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <BgColorsOutlined /> Color
                </span>
              }
            >
              <div style={{ marginTop: "-5px" }}>{showColors()}</div>
            </SubMenu>
            {/* shipping */}
            {/* <SubMenu
              key="7"
              title={
                <span className="h6">
                  <TransactionOutlined /> Shipping
                </span>
              }
            >
              <div style={{ marginTop: "-5px" }}>{showShipping()}</div>
            </SubMenu> */}
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          <hr />
          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
