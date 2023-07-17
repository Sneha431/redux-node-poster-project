import React, { useEffect, useState } from "react";
import noimg from "../assets/images/No_Image_Available.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "./store/cartSlice";

import {
  fetchproducts,
  searchproductbytitle,
  fetchwishlistdetails,
  insertwishlistdata,
} from "./store/ProductSlice";
import ReactPaginate from "react-paginate";
const MovieList = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const [offset, setOffset] = useState(1);

  const [poster, setposter] = useState([]);
  const { data, totalresult, searchdata, size } = useSelector(
    (state) => state.product
  );

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
    dispatch(fetchproducts(selectedPage + 1));

    setposter(data);
  };
  useEffect(() => {
    dispatch(fetchproducts(1));
    setposter(data);
  }, []);

  // const onsearchhandler = (e) => {
  //   dispatch(searchproductbytitle(e.target.value));

  //   setposter(searchdata);
  //   console.log(searchdata);
  // };
  const onsearchhandler = (e) => {
    //  e.preventDefault();
    setSearchInput(e.target.value);
    dispatch(searchproductbytitle(searchInput));
    // console.log(searchInput.length);
    // if (searchInput.length > 0) {
    //   dispatch(searchproductbytitle(searchInput));
    //   setposter(searchdata);
    // } else if (searchInput.length <= 1) {
    //   setposter(searchdata);
    // }
  };
  const onsubmit = () => {
    setposter(searchdata);
  };
  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="movie-list">
              <input
                type="search"
                placeholder="Search By Movie Title"
                onChange={(e) => onsearchhandler(e)}
                value={searchInput}
              />
              <button onClick={onsubmit}>Search</button>
              <h1>MovieList</h1>

              {poster &&
                poster.map((item) => {
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
                      <button onClick={() => dispatch(addtocart(item))}>
                        Add To Cart
                      </button>
                      <button
                        onClick={() => dispatch(insertwishlistdata(item))}
                      >
                        Add To WishList <i className="fa fa-heart"></i>
                      </button>
                    </div>
                  );
                })}
              {!poster && <h2>No Poster Found</h2>}
              {searchdata === [""] && <h2>No Poster Found</h2>}
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
