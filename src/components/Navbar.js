import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { wishlistproduct } = useSelector((state) => state.product);
  const [active, setactive] = useState("Home");
  const [toggle, settoggle] = useState(false);
  const settogglefunc = () => {
    settoggle(!toggle);
  };
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
              <li className="menu-item">
                <Link
                  className={`nav-link ${
                    active === "Home" ? "activeclass" : ""
                  }`}
                  aria-current="page"
                  to="/"
                  onClick={() => setactive("Home")}
                >
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  className={`nav-link ${
                    active === "List" ? "activeclass" : ""
                  }`}
                  to="/MovieList"
                  onClick={() => setactive("List")}
                >
                  Movies
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  className={`nav-link ${
                    active === "Cart" ? "activeclass" : ""
                  }`}
                  to="/cart"
                  onClick={() => setactive("Cart")}
                >
                  Cart
                  <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  className={`nav-link ${
                    active === "Wish" ? "activeclass" : ""
                  }`}
                  to="/wishlist"
                  onClick={() => setactive("Wish")}
                >
                  Wishlist
                  <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistproduct.length}
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
