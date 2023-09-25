import React, { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

import {
  useNavigate,
  useLocation,
  Link,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { cartTotal } from "./store/cartSlice";
import { useSelector } from "react-redux";
import { useRef } from "react";
const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const totalprice = useSelector(cartTotal).toFixed(2);
  const { state } = useLocation();
  const [queryParameters] = useSearchParams();

  let cartitemnames = [];

  cart.map((item) => {
    if (!cartitemnames.includes(item.Title)) {
      //  cartitemnames.push(item.Title+" ");
      var title = item.Title;
      var qty = item.quantity;
      var price = item.price;
      cartitemnames.push({
        name: title,
        quantity: qty.toString(),
        // unit_amount: { currency_code: "USD", value: price.toString() },
        unit_amount: { currency_code: "USD", value: "0.00" },
      });
    }
  });

  const [alert, setalertclass] = useState("");
  const totalp = useRef();
  return (
    <main className="main-content">
      <div className="container">
        {alert && (
          <div
            className={`alert ${
              alert === "Payment Successfull" ? "alert-success" : "alert-danger"
            } d-flex align-items-center`}
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
              viewBox="0 0 16 16"
              role="img"
              aria-label="Warning:"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>{alert}</div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <h1>FINAL STEP:</h1>

            <div className="col-md-6">
              <h3>Shipping Information</h3>
              <form className="row g-3">
                <div className="mb-3">
                  <div className="fields__elements fields__elements--half">
                    <label htmlFor="first-name" className="form-label">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      className="form-control"
                      value={state && state.data.firstName}
                    />
                  </div>
                  <div className="col-auto">
                    <label htmlFor="last-name" className="form-label">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      className="form-control"
                      value={state && state.data.lastName}
                    />
                  </div>

                  <div className="col-auto">
                    <label htmlFor="shipping-address" className="form-label">
                      Shipping Address line 1 *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress1"
                      id="shipping-address"
                      className="form-control"
                      value={state && state.data.shippingAddress1}
                    />
                  </div>
                  <div className="col-auto">
                    <label htmlFor="shipping-address" className="form-label">
                      Shipping Address line 2*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="shippingAddress2"
                      id="shipping-address"
                      value={state && state.data.shippingAddress2}
                    />
                  </div>

                  <div className="col-auto">
                    <label htmlFor="country" className="form-label">
                      Country *
                    </label>
                    <select
                      name="shippingCountry"
                      className="form-control"
                      id="country"
                    >
                      <option value="US">United States</option>
                    </select>
                  </div>

                  <div className="col-auto">
                    <label htmlFor="city" className="form-label">
                      City *
                    </label>
                    <input
                      type="text"
                      name="shippingCity"
                      id="city"
                      className="form-control"
                      value={state && state.data.shippingCity}
                    />
                  </div>

                  <div className="col-auto">
                    <label htmlFor="state" className="form-label">
                      State *
                    </label>

                    <select
                      name="shippingState"
                      id="states"
                      className="form-control"
                      value={state && state.data.shippingState}
                    >
                      <option value="">Select Your State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>

                  <div className="col-auto">
                    <label htmlFor="zip" className="form-label">
                      Zip Code *
                    </label>
                    <input
                      type="number"
                      name="shippingZip"
                      className="form-control"
                      value={state && state.data.shippingZip}
                    />
                  </div>
                </div>

                <button type="button">
                  <Link to={`/prospect?${queryParameters}`}>
                    Update Shipping Information
                  </Link>
                </button>
              </form>
            </div>

            <div className="col-md-6">
              <h3>Item Information</h3>
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
                      <tr key={item.imdbID}>
                        <td>{item.Title}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h1 price={totalprice} ref={totalp}>
                Total: ${totalprice}
              </h1>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ARNMywa98AcRZjmGQ7KVSI0XfjxdOsjZecD9q60VJoykSYFsGvA2n-mzirC8xJM6dVKjcIHxqz_yYyGZ",
                }}
              >
                <PayPalButtons
                  fundingSource={FUNDING.PAYPAL}
                  createOrder={(data, actions) => {
                    // const desp = JSON.stringify(cartitemnames).replace(
                    //   /[\[\]""]+/g,
                    //   ""
                    // );
                    //  Object.assign({}, cartitemnames);
                    console.log(JSON.stringify(cart));
                    let totalamount = totalp.current.getAttribute("price");

                    return actions.order.create({
                      purchase_units: [
                        {
                          description: "ReduxPosters",

                          items: JSON.parse(JSON.stringify(cartitemnames)),

                          amount: {
                            //  value: totalamount,
                            value: 0.01,
                            breakdown: {
                              item_total: {
                                currency_code: "USD",
                                // value: totalamount.toString(),
                                value: 0.01,
                              },
                            },
                          },
                          shipping: {
                            name: {
                              full_name:
                                state.data.firstName +
                                " " +
                                state.data.lastName,
                            },
                            address: {
                              address_line_1: state.data.shippingAddress1,
                              address_line_2: state.data.shippingAddress2,
                              admin_area_2: state.data.shippingCity,
                              admin_area_1: state.data.shippingState,
                              postal_code: state.data.shippingZip,
                              country_code: state.data.shippingCountry,
                            },
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      // const name = details.payer.name.given_name;
                      const orderdata = actions.order.capture();

                      setalertclass("Payment Successfull");
                      const result = fetch(
                        "http://localhost:5000/insertcheckoutdata",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            firstName: state.data.firstName,
                            lastName: state.data.lastName,
                            email: state.data.email,
                            phone: state.data.phone,
                            shippingAddress1: state.data.shippingAddress1,
                            shippingAddress2: state.data.shippingAddress2,
                            shippingCountry: state.data.shippingCountry,
                            shippingCity: state.data.shippingCity,
                            shippingState: state.data.shippingState,
                            shippingZip: state.data.shippingZip,
                            orderId: details.id,
                            prospectid: queryParameters.get("customer_id"),
                            cartitem: cart,
                          }),
                        }
                      );
                      if (result) {
                        setTimeout(() => {
                          var r = createSearchParams({
                            order_id: details.id,
                          }).toString();
                          navigate(
                            "/Thank-you?" + queryParameters + "&" + r,

                            { state: orderdata }
                          );
                        }, 5000);
                      }
                      // console.log(JSON.stringify(data));
                    });
                  }}
                  // onApprove={(data, actions) => {
                  //   // const name = details.payer.name.given_name;

                  //   const orderdata = actions.order.capture();
                  //   console.log(orderdata.value.id);
                  //   const result = fetch("http://localhost:5000/insertcheckoutdata", {
                  //     method: "POST",
                  //     headers: {
                  //       "Content-Type": "application/json",
                  //     },
                  //     body: JSON.stringify({
                  //       firstName: state.data.firstName,
                  //       lastName: state.data.lastName,
                  //       email: state.data.email,
                  //       phone: state.data.phone,
                  //       shippingAddress1: state.data.shippingAddress1,
                  //       shippingAddress2: state.data.shippingAddress2,
                  //       shippingCountry: state.data.shippingCountry,
                  //       shippingCity: state.data.shippingCity,
                  //       shippingState: state.data.shippingState,
                  //       shippingZip: state.data.shippingZip,
                  //       orderId: orderdata.value.id,
                  //       cartitem: cart,
                  //     }),
                  //   });
                  //   if (result) {
                  //     setalertclass("Payment Successfull");
                  //     setTimeout(() => {
                  //       var r = createSearchParams({
                  //         order_id: orderdata.value.id,
                  //       }).toString();
                  //       navigate(
                  //         "/Thank-you?" + queryParameters + "&" + r,

                  //         { state: orderdata }
                  //       );
                  //     }, 5000);
                  //   }
                  // }}
                  onCancel={(data) => {
                    setalertclass("Payment Cancelled");
                    setInterval(() => {
                      setalertclass("");
                    }, 5000);
                  }}
                  onError={(err) => {
                    setalertclass(err.message);
                    setInterval(() => {
                      setalertclass("");
                    }, 5000);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
