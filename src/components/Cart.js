import React, { useRef } from "react";
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
import { fetchwishlistdetails, insertwishlistdata } from "./store/ProductSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalprice = useSelector(cartTotal).toFixed(2);
  const totalqty = useSelector(cartTotalqty);
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
      <h4>
        Cart <i className="fa fa-arrow-right" aria-hidden="true"></i>Prospect
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
        Checkout <i className="fa fa-arrow-right" aria-hidden="true"></i>Order
        Confirmation
      </h4>
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
                  onClick={() => dispatch(insertwishlistdata(item))}
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

      <hr />
      <div className="checkout">
        <div className="total">
          <div>
            <div className="Subtotal" style={{ color: "white" }}>
              Sub-Total
            </div>
            <div className="items" style={{ color: "white" }}>
              {totalqty} items
            </div>
          </div>
          <div
            className="total-amount"
            style={{ color: "white" }}
            ref={totalp}
            price={totalprice}
          >
            ${totalprice}
          </div>
        </div>
        {/* <div>
          <div ref={paypal}></div>
        </div> */}
        <button type="button" className="button">
          <Link style={{ textDecoration: "none" }} onClick={submitcartdata}>
            {" "}
            Go To Next Step{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
