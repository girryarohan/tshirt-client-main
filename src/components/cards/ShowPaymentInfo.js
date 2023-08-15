import React from "react";

function ShowPaymentInfo({ order, showStatus = true }) {
  return (
    <div>
      <div className="container">
        <div className="row text-left">
          <div className="col-sm">
            <h6>
              <b>Order ID:</b> {order.paymentIntent.id}
            </h6>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row text-left">
          <div className="col-sm">
            {" "}
            Amount:{" "}
            {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </div>
          <div className="col-sm">
            Currency: {order.paymentIntent.currency.toUpperCase()}
          </div>
          <div className="col-sm">
            Method: {order.paymentIntent.payment_method_types[0]}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row text-left">
          <div className="col-sm">
            Payment: {order.paymentIntent.status.toUpperCase()}
          </div>
          <div className="col-sm">
            Ordered on:{" "}
            {order.orderStatus === "Cash On Delivery"
              ? new Date(order.paymentIntent.created).toLocaleString()
              : new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </div>

          <div className="col-sm">
            {showStatus && (
              <span className="badge bg-primary text-white">
                STATUS: {order.orderStatus}
              </span>
            )}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default ShowPaymentInfo;
