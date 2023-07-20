import React, { useEffect, useState } from "react";
import {
  fetchwishlistdetails,
  fetchwishlistdetailsall,
  removefromwishlistdata,
} from "./store/ProductSlice";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import noimg from "../assets/images/No_Image_Available.jpg";
import { addtocart } from "./store/cartSlice";
import { useRef } from "react";

function MovieDetail() {
  const dispatch = useDispatch();
  const { wishlistproduct, size, totalresult, wishlistproductall } =
    useSelector((state) => state.product);
  const [offset, setOffset] = useState(1);
  const [msg, setmsg] = useState(false);

  const titleref = useRef();
  const [wishlistproductdata, setwishlistproductdata] = useState([]);

  const removeload = (id, imdbid) => {
    dispatch(removefromwishlistdata(id, imdbid));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);

    dispatch(fetchwishlistdetails(selectedPage + 1));
    setwishlistproductdata(wishlistproduct);
    console.log(selectedPage);
  };
  useEffect(() => {
    dispatch(fetchwishlistdetails(1));
    dispatch(fetchwishlistdetailsall());
    setwishlistproductdata(wishlistproduct);
  }, []);
  const onsearchhandler = () => {
    const searchVal = titleref.current.value;

    if (searchVal === "") {
      setmsg(false);
      setwishlistproductdata(wishlistproduct);
      return;
    }
    console.log(msg);
    const filterBySearch = wishlistproductall.postersdata.filter((item) => {
      if (item.Title.toLowerCase().includes(searchVal.toLowerCase())) {
        setmsg(false);
        return item;
      }
    });
    console.log(typeof filterBySearch);
    setwishlistproductdata(filterBySearch);

    if (Object.keys(filterBySearch).length === 0) {
      setmsg(true);
    }
  };
  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="movie-list">
              <input
                type="text"
                placeholder="Search.."
                name="search"
                ref={titleref}
              />
              <button
                type="submit"
                className="search-container-button"
                onClick={onsearchhandler}
              >
                Submit
              </button>
              <h1>My WishList Collection</h1>

              {wishlistproductdata &&
                wishlistproductdata.map((item) => {
                  return (
                    <div
                      className="movie"
                      style={{ width: "18rem" }}
                      key={item._id}
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
                          onClick={() => removeload(item._id, item.imdbID)}
                        >
                          Remove From Collection
                        </button>
                        <button
                          className="btn-warning"
                          onClick={() => dispatch(addtocart(item))}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              {/* {display &&
                itemfound &&
                wishlistproductdata &&
                wishlistproduct.map((item) => {
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
                      <button
                        className="btn btn-default"
                        onClick={() => removeload(item._id, item.imdbID)}
                      >
                        Remove From Collection
                      </button>
                      <button
                        className="btn btn-default"
                        onClick={() => dispatch(addtocart(item))}
                      >
                        Add To Cart
                      </button>
                    </div>
                  );
                })} */}

              {msg && <p> Item not Found</p>}
            </div>
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
      </main>
    </>
  );
}

export default MovieDetail;
