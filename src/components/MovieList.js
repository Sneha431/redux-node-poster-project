import React, { useEffect, useState, useRef } from "react";
import noimg from "../assets/images/No_Image_Available.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "./store/cartSlice";

import {
  fetchproducts,
  searchproductbytitle,
  insertwishlistdata,
} from "./store/ProductSlice";
import ReactPaginate from "react-paginate";
const MovieList = () => {
  const dispatch = useDispatch();
  const titleref = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [movielistdata, setmovielistdata] = useState([]);
  const [offset, setOffset] = useState(1);
  const [msgdata, setmsg] = useState(false);
  const [poster, setposter] = useState([]);
  const { data, totalresult, searchdata, size, msg } = useSelector(
    (state) => state.product
  );
  const [alertmsg, setalertmsg] = useState("");
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
    dispatch(fetchproducts(selectedPage + 1));

    setposter(data);
  };
  useEffect(() => {
    dispatch(fetchproducts(1));
    setmovielistdata(data);
    setposter(data);
  }, []);
  const onsearchhandler = () => {
    const searchVal = titleref.current.value;

    if (searchVal === "") {
      setmsg(false);
      setmovielistdata(data);
      return;
    }
    console.log(data);
    const filterBySearch = data.filter((item) => {
      if (item.Title.toLowerCase().includes(searchVal.toLowerCase())) {
        setmsg(false);
        return item;
      }
    });
    console.log(typeof filterBySearch);
    setmovielistdata(filterBySearch);

    if (Object.keys(filterBySearch).length === 0) {
      setmsg(true);
    }
  };
  // const onsearchhandler = (e) => {
  //   dispatch(searchproductbytitle(e.target.value));

  //   setposter(searchdata);
  //   console.log(searchdata);
  // };
  // const onsearchhandler = (e) => {
  //   //  e.preventDefault();
  //   setSearchInput(e.target.value);
  //   dispatch(searchproductbytitle(searchInput));
  //   // console.log(searchInput.length);
  //   // if (searchInput.length > 0) {
  //   //   dispatch(searchproductbytitle(searchInput));
  //   //   setposter(searchdata);
  //   // } else if (searchInput.length <= 1) {
  //   //   setposter(searchdata);
  //   // }
  // };

  // const onsubmit = () => {
  //   setposter(searchdata);
  // };

  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="movie-list">
              <input
                type="search"
                placeholder="Search By Movie Title"
                ref={titleref}
              />
              <button
                onClick={onsearchhandler}
                className="search-container-button"
              >
                Search
              </button>
              <h1>MovieList</h1>
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
              {movielistdata.map((item) => {
                return (
                  <div
                    className="movie"
                    style={{ width: "18rem" }}
                    key={item.imdbID}
                  >
                    <figure className="movie-poster">
                      <img
                        src={item.Poster !== "N/A" ? item.Poster : noimg}
                        className="card-img-top"
                        alt={item.Title}
                      />
                    </figure>
                    <div className="movie-title">{item.Title}</div>
                    <p className="card-text"> {item.Year}</p>
                    <p className="card-text"> ${item.price}</p>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        className="btn-primary"
                        onClick={() => dispatch(addtocart(item))}
                      >
                        Add To Cart
                      </button>
                      <button
                        onClick={() =>
                          dispatch(insertwishlistdata(item), setalertmsg(msg))
                        }
                        className="btn-success"
                      >
                        Add To WishList <i className="fa fa-heart"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
              {!poster && <h2>No Poster Found</h2>}
              {searchdata === [""] && <h2>No Poster Found</h2>}
              {msgdata && <p> Item not Found</p>}
            </div>

            <div className="pagination">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(totalresult / size)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MovieList;
