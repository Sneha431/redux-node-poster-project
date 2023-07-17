import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="widget">
                <h3 className="widget-title">About Us</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                  tempore vitae mollitia nesciunt saepe cupiditate
                </p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="widget">
                <h3 className="widget-title">Recent Review</h3>
                <ul className="no-bullet">
                  <li>
                    <Link to="/">Lorem ipsum dolor</Link>
                  </li>
                  <li>
                    <Link to="/">Sit amet consecture</Link>
                  </li>
                  <li>
                    <Link to="/">Dolorem respequem</Link>
                  </li>
                  <li>
                    <Link to="/">Invenore veritae</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="widget">
                <h3 className="widget-title">Help Center</h3>
                <ul className="no-bullet">
                  <li>
                    <Link to="/">Lorem ipsum dolor</Link>
                  </li>
                  <li>
                    <Link to="/">Sit amet consecture</Link>
                  </li>
                  <li>
                    <Link to="/">Dolorem respequem</Link>
                  </li>
                  <li>
                    <Link to="/">Invenore veritae</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="widget">
                <h3 className="widget-title">Join Us</h3>
                <ul className="no-bullet">
                  <li>
                    <Link to="/">Lorem ipsum dolor</Link>
                  </li>
                  <li>
                    <Link to="/">Sit amet consecture</Link>
                  </li>
                  <li>
                    <Link to="/">Dolorem respequem</Link>
                  </li>
                  <li>
                    <Link to="/">Invenore veritae</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="widget">
                <h3 className="widget-title">Social Media</h3>
                <ul className="no-bullet">
                  <li>
                    <Link to="/">Facebook</Link>
                  </li>
                  <li>
                    <Link to="/">Twitter</Link>
                  </li>
                  <li>
                    <Link to="/">Google+</Link>
                  </li>
                  <li>
                    <Link to="/">Pinterest</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="widget">
                <h3 className="widget-title">Newsletter</h3>
                <form action="/" className="subscribe-form">
                  <input type="text" placeholder="Email Address" />
                </form>
              </div>
            </div>
          </div>

          <div className="colophon">Copyright 2023. All rights reserved</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
