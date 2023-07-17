import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { cartTotal, clearCart } from "./store/cartSlice";

const ThankYou = (orderdata) => {
  const location = useLocation();
  const data = location.state;

  const cart = useSelector((state) => state.cart);
  const totalprice = useSelector(cartTotal).toFixed(2);
  const dispatch = useDispatch();
  useEffect(() => {
    setInterval(() => {
      dispatch(clearCart(cart));
    }, 98000);
  });
  const [queryParameters] = useSearchParams();
  return (
    <main className="main-content">
      <div className="container">
        <h1>Thank You For Your Order</h1>
        <h2>Item Ordered</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Item Quantity</th>
              <th scope="col">Item Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <tr>
                  <td>{item.Title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h1>Total: ${totalprice}</h1>
        <h3>Transaction ID</h3>
        <p>{data && data.value.id} </p>
        <h3>Customer ID</h3>
        {queryParameters && queryParameters.get("customer_id")}
        {data &&
          data.value.purchase_units.map((item) => {
            return (
              <div key={item}>
                {/* <h3>Item Ordered</h3>
                <ul>
                  <li>{JSON.parse(item.description)}</li>
                </ul> */}
                <h3>Shipping Address</h3>
                <span>
                  <b>Full name: </b> {item.shipping.name.full_name}
                  <br />
                  <b>Address: </b> {item.shipping.address.address_line_1},
                  {item.shipping.address.admin_area_1},
                  {item.shipping.address.admin_area_2}
                  <br />
                  <b>Country Code: </b>
                  {item.shipping.address.country_code}
                  <br />
                  <b>Zip Code: </b>
                  {item.shipping.address.postal_code}
                </span>
                {/* <br></br>
                <div
                  style={{ display: "none" }}
                  ref={totalp}
                  price={item.amount.value}
                ></div> */}

                {/* {item.amount.currency_code} */}
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default ThankYou;
