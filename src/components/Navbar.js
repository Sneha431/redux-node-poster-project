import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchwishlistdetailsall } from "./store/ProductSlice";
function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { totalresultwish } = useSelector((state) => state.product);
  const [active, setactive] = useState("Home");
  const [toggle, settoggle] = useState(false);
  const settogglefunc = () => {
    settoggle(!toggle);
  };
  useEffect(() => {
    dispatch(fetchwishlistdetailsall());
    console.log(totalresultwish);
  }, []);
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link to="/" id="branding">
            <img src="images/logo.png" alt="" className="logo" />
          </Link>

          <div className="main-navigation">
            <button
              type="button"
              className="menu-toggle"
              onClick={settogglefunc}
            >
              <i className="fa fa-bars"></i>
            </button>
            <ul className="menu" style={{ display: toggle ? "block" : "none" }}>
              <li
                className={`menu-item ${
                  active === "Home" ? "activeclass" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={() => setactive("Home")}
                >
                  Home
                </Link>
              </li>
              <li
                className={`menu-item ${
                  active === "List" ? "activeclass" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  to="/MovieList"
                  onClick={() => setactive("List")}
                >
                  Movies
                </Link>
              </li>

              <li
                className={`menu-item ${
                  active === "Cart" ? "activeclass" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  to="/cart"
                  onClick={() => setactive("Cart")}
                >
                  Cart
                  <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                </Link>
              </li>
              <li
                className={`menu-item ${
                  active === "Wish" ? "activeclass" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  to="/wishlist"
                  onClick={() => setactive("Wish")}
                >
                  Wishlist
                  <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalresultwish}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mobile-navigation"></div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
