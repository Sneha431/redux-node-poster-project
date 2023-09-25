import React, { useRef, useState } from "react";
import "../assets/css/cartpage.css";
import { useDispatch, useSelector } from "react-redux";

import noimg from "../assets/images/No_Image_Available.jpg";
import { Link } from "react-router-dom";
import {
  removefromcart,
  clearCart,
  cartTotal,
  inccartquantity,
  deccartquantity,
  cartTotalqty,
} from "./store/cartSlice";
import { useNavigate } from "react-router-dom";
import { insertwishlistdata } from "./store/ProductSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { msg } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalprice = useSelector(cartTotal).toFixed(2);
  const totalqty = useSelector(cartTotalqty);

  const [alertmsg, setalertmsg] = useState("");
  const cartitemnames = [];
  cart.map((item) => {
    if (!cartitemnames.includes(item.Title)) {
      cartitemnames.push(item.Title + ", ");
    }
  });

  const totalp = useRef();
  // const paypal = useRef();
  // useEffect(() => {
  //   return () => paypalfunc();
  // }, [paypal]);
  // const paypalfunc = () => {
  //   const cartitemnames = [];
  //   cart.map((item) => {
  //     if (!cartitemnames.includes(item.Title)) {
  //       cartitemnames.push(item.Title + ", ");
  //       // let paypalitem = new Set(cartitemnames);
  //     }
  //   });
  //   window.paypal
  //     .Buttons({
  //       createOrder: (data, actions, err) => {
  //         return actions.order.create({
  //           intent: "CAPTURE",
  //           purchase_units: [
  //             {
  //               description: JSON.stringify(cartitemnames),
  //               amount: {
  //                 currency_code: "USD",
  //                 value: totalp.current.value,
  //               },
  //             },
  //           ],
  //         });
  //       },
  //       onApprove: (data, actions) => {
  //         const order = actions.order.capture();
  //         console.log(data.orderID);
  //       },
  //       onError: (err) => {
  //         console.log(err);
  //       },
  //     })
  //     .render(paypal.current);
  // };
  const submitcartdata = async () => {
    const result = await fetch("http://localhost:5000/insertcartdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartitem: cart }),
    });

    if (result) {
      navigate("/prospect");
    }
  };
  return (
    <div className="CartContainer">
      {alertmsg && (
        <div
          className={`alert ${
            alertmsg === "Already Exists In Wishlist"
              ? "alert-warning"
              : "alert-success"
          } alert-dismissible fade show d-flex align-items-center`}
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
          <div>{alertmsg}</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="Header">
        <h3 className="Heading">Shopping Cart</h3>
        <h5 className="Action" onClick={() => dispatch(clearCart(cart))}>
          Remove All
        </h5>
      </div>
      {cart &&
        cart.map((item) => {
          return (
            <div className="Cart-Items" key={item.imdbID}>
              <div className="image-box">
                <img
                  src={item.Poster !== "N/A" ? item.Poster : noimg}
                  style={{ height: "120px" }}
                  alt={item.Title}
                />
              </div>
              <div className="about">
                <h1 className="title">{item.Title}</h1>
                <h3 className="subtitle">{item.Year}</h3>
              </div>
              <div className="counter">
                <div
                  className="btn"
                  onClick={() => dispatch(inccartquantity(item, item.quantity))}
                >
                  +
                </div>
                <div className="count">{item.quantity}</div>
                <div
                  className="btn"
                  onClick={() => dispatch(deccartquantity(item, item.quantity))}
                >
                  -
                </div>
              </div>
              <div className="prices">
                <div className="amount">${item.price}</div>
                <div
                  className="save"
                  onClick={() =>
                    dispatch(insertwishlistdata(item), setalertmsg(msg))
                  }
                >
                  Add To WishList <i className="fa fa-heart"></i>
                </div>
                <div
                  className="remove"
                  onClick={() => dispatch(removefromcart(item))}
                >
                  Remove
                </div>
              </div>
            </div>
          );
        })}
      {cart.length === 0 && <p>Cart is Empty . Continue Shopping</p>}

      <div className="checkout">
        <div className="total">
          <div>
            <div className="Subtotal" style={{ color: "white" }}>
              <p>Sub-Total</p>
            </div>
          </div>

          <div
            className="total-amount "
            style={{ color: "white" }}
            ref={totalp}
            price={totalprice}
          >
            <p style={{ color: "black", fontSize: "20px", float: "right" }}>
              {" "}
              ${totalprice} ({totalqty} items)
            </p>
            <button type="button" className="button">
              <Link style={{ textDecoration: "none" }} onClick={submitcartdata}>
                Go To Next Step
              </Link>
            </button>
          </div>
        </div>
        {/* <div>
          <div ref={paypal}></div>
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
