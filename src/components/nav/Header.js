import React, { useState } from "react";
import { Menu, Badge, Layout } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  CodepenCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import Text from "antd/lib/typography/Text";
import "./navStyles.css";

const { SubMenu, Item } = Menu;
const { Header: HeaderMain } = Layout;

function Header() {
  const [current, setCurrent] = useState("home");
  // useDispatch used here bcoz we cannot pass history in header beacause it is not part of a routes
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  const handleClick = (e) => {
    //
    setCurrent(e.key);
  };
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Layout>
      <HeaderMain className="header p-0">
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme="dark"
          className="menuStyles"
        >
          <Item key="home" icon={<CodepenCircleOutlined />}>
            <Link to="/">eCom.in</Link>
          </Item>
          <Item key="shop" icon={<ShoppingOutlined />}>
            <Link to="/shop">Shop</Link>
          </Item>
          {/* <Item
            key="cart"
            icon={<ShoppingCartOutlined />}
            className="cartExpand"
          >
            <Link to="/cart" className="cartStyle">
              <Badge count={cart.length} offset={[9, 0]} color="#1890ff">
                Cart
              </Badge>
            </Link>
          </Item> */}
          {!user && (
            <Item
              key="register"
              icon={<UserAddOutlined />}
              className="navBarCustom flexAdjustToRight"
            >
              <Link to="/register">Register</Link>
            </Item>
          )}
          {!user && (
            <Item key="login" icon={<UserOutlined />} className="navBarCustom">
              <Link to="/login"> Login</Link>
            </Item>
          )}
          {user && (
            <SubMenu
              key="SubMenu"
              icon={<SettingOutlined />}
              title={user.email && user.email.split("@")[0]}
              className="navBarCustom flexAdjustToRight"
            >
              {user && user.role === "subscriber" && (
                <Item>
                  <Link to="/user/history">My Dashboard</Link>
                </Item>
              )}
              {user && user.role === "admin" && (
                <Item>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </Item>
              )}

              <Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Item>
            </SubMenu>
          )}

          <span className="p-1 searchComponent">
            <Search />
          </span>
        </Menu>
      </HeaderMain>
    </Layout>
  );
}

export default Header;
