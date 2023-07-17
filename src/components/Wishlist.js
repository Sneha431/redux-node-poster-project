import React, { useEffect, useState } from "react";
import {
  removefromwishlist,
  fetchwishlistdetails,
  searchproductbytitle,
  removefromwishlistdata,
} from "./store/ProductSlice";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import noimg from "../assets/images/No_Image_Available.jpg";
import { addtocart } from "./store/cartSlice";
import { useRef } from "react";

function MovieDetail() {
  const dispatch = useDispatch();
  const { wishlistproduct, size, totalresult, searchdata } = useSelector(
    (state) => state.product
  );
  const [offset, setOffset] = useState(1);
  const [title, settitle] = useState("");
  const [itemfound, setitemfound] = useState(true);
  const [display, setdisplay] = useState(false);
  const titleref = useRef();
  const [wishlistproductdata, setwishlistproductdata] = useState([]);
  // const onsearchhandler = (e) => {
  //   setdisplay(true);
  //   wishlistproduct.filter((item) => {
  //     if (item.Title.toLowerCase().includes(title.toLowerCase())) {
  //       return item;
  //     } else {
  //       setitemfound(false);
  //     }
  //   });
  // };

  const onsearchhandler = () => {
    console.log(titleref.current.value);
    dispatch(searchproductbytitle(titleref.current.value));
    if (dispatch(searchproductbytitle(titleref.current.value))) {
      setwishlistproductdata(searchdata);
    }
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
    setwishlistproductdata(wishlistproduct);
    console.log(wishlistproduct);
  }, []);
  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="movie-list">
              <input
                type="text"
                placeholder="Search By Movie Title"
                onChange={(e) => settitle(e.target.value)}
                ref={titleref}
              />
              <button onClick={onsearchhandler}>Search</button>
              <h1>My WishList Collection</h1>

              {!display &&
                wishlistproductdata &&
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
                      <button
                        onClick={() =>
                          dispatch(
                            removefromwishlistdata(item._id, item.imdbID)
                          )
                        }
                      >
                        Remove From Collection
                      </button>
                      <button onClick={() => dispatch(addtocart(item))}>
                        Add To Cart
                      </button>
                    </div>
                  );
                })}
              {display &&
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
                        onClick={() =>
                          dispatch(
                            removefromwishlistdata(item._id, item.imdbID)
                          )
                        }
                      >
                        Remove From Collection
                      </button>
                      <button onClick={() => dispatch(addtocart(item))}>
                        Add To Cart
                      </button>
                    </div>
                  );
                })}

              {!itemfound && title && <p> No Result Found</p>}
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
