import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
function Cart({ history }) {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("CART SAVE ERR", err));
  };

  //saveCashOrderToDb
  const saveCashOrderToDb = () => {
    //
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("CART SAVE ERR", err));
  };
  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Type</th>
          <th scope="col">Color</th>
          {/* <th scope="col">Count</th> */}
          {/* <th scope="col">Shipping</th> */}
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>
          {!cart.length ? (
            <p>
              No products in cart.<Link to="/shop"> Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <h5>Products</h5>
          <hr />
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                <span className="text-info">{c.title} </span>
                &nbsp;<b>x</b> {c.count}
                <span className="float-right">= ₹{c.price * c.count}</span>
              </p>
            </div>
          ))}
          <hr />
          Total: <b>₹{getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-info btn-raised mt-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-dark btn-raised mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-info btn-raised mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
                className="text-white"
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
      {!cart.length && (
        <>
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default Cart;
