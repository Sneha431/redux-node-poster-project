import React, { useEffect } from "react";
import Slider from "react-touch-drag-slider";

import { useSelector, useDispatch } from "react-redux";
import { fetchproductsimages } from "./store/ProductSlice";
const Banner = () => {
  const { images } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchproductsimages());
    console.log(images);
  }, []);
  return (
    <div className="main2">
      <Slider>
        {images &&
          images.map((item) => (
            <div key={item.imdbID}>
              <img src={item.Poster} alt={item.Poster} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Banner;
