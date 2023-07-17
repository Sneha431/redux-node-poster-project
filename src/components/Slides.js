import React from "react";
import Slider from "react-touch-drag-slider";

import images from "./images";

// Whatever you render out in the Slider will be draggable 'slides'
function Slides() {
  return (
    <div className="main2">
      <Slider>
        {images.map(({ url, title }, index) => (
          <img src={url} key={index} alt={title} />
        ))}
      </Slider>
    </div>
  );
}

export default Slides;
