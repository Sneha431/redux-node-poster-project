import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchproductsimages } from "./store/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
function LatestMovie(props) {
  const { images } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(fetchproductsimages());
  }, []);
  return (
    <div>
      <div className="row">
        <h1 className="text-center">Latest Movies</h1>
        {images &&
          images.slice(0, 4).map((item) => {
            return (
              <div className="col-sm-6 col-md-3" key={item.imdbID}>
                <div className="latest-movie">
                  <img src={item.Poster} alt={item.Title} />
                  <button className="btn btn-default">
                    {" "}
                    <Link to={`/MovieDetails/${item.imdbID}`}>View </Link>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LatestMovie;
