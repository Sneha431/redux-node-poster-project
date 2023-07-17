import axios from "axios";
const { createSlice } = require("@reduxjs/toolkit");

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    singledata: [],
    ratings: [],
    searchdata: [],
    wishlistproduct: [],
    status: STATUSES.IDLE,
    images: [],
    totalresult: 0,
    size: 0,
  },
  reducers: {
    setproducts(state, action) {
      state.data = action.payload;
    },
    setstatus(state, action) {
      state.status = action.payload;
    },
    settotalresult(state, action) {
      state.totalresult = action.payload;
    },
    setsingleproduct(state, action) {
      state.singledata = action.payload;
    },
    setratings(state, action) {
      state.ratings = action.payload;
    },
    searchproducts(state, action) {
      state.searchdata = action.payload;
    },
    setwishlistproduct(state, action) {
      // const duplicate = state.wishlistproduct.find(
      //   (item) => item.imdbID === action.payload.imdbID
      // );
      // if (!duplicate) {
      //   state.wishlistproduct = [...state.wishlistproduct, action.payload];
      // }
      state.wishlistproduct = action.payload;
    },
    removefromwishlist(state, action) {
      state.wishlistproduct = state.wishlistproduct.filter(
        (item) => item.imdbID !== action.payload
      );
    },
    setimages(state, action) {
      state.images = action.payload;
    },
    setpagesize(state, action) {
      state.size = action.payload;
    },
  },
});
export const {
  setimages,
  setproducts,
  setstatus,
  settotalresult,
  setsingleproduct,
  setratings,
  searchproducts,
  setwishlistproduct,
  removefromwishlist,
  setpagesize,
} = productSlice.actions;
export default productSlice.reducer;

export function fetchproducts(page) {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`http://localhost:5000/getalldatas/${page}`)

        .then((response) => {
          dispatch(settotalresult(response.data.total));

          dispatch(setproducts(response.data.postersdata));
          dispatch(setstatus(STATUSES.IDLE));
          dispatch(setpagesize(response.data.pageSize));
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function fetchproductsimages() {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`http://localhost:5000/getallpostersall`)

        .then((response) => {
          dispatch(setimages(response.data));
          console.log(response);
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function fetchproductdetails(imdbid) {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`http://localhost:5000/getsingledata/${imdbid}`)

        .then((response) => {
          dispatch(setsingleproduct(response.data[0]));
          console.log(response.data[0]["Ratings"]);
          dispatch(setratings(response.data[0]["Ratings"]));
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function fetchwishlistdetails(page) {
  return async function fetchwishlistproductsthunk(dispatch, getstate) {
    try {
      await axios
        .get(`http://localhost:5000/fetchwishlistdetails/${page}`)

        .then((response) => {
          dispatch(setwishlistproduct(response.data.wishlistresultsdata));
          dispatch(setpagesize(response.data.pageSize));
          dispatch(settotalresult(response.data.total));
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function insertwishlistdata(data) {
  return async function insertproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));

    let { Title, Year, price, quantity, Poster, imdbID } = data;
    try {
      await axios
        .post(`http://localhost:5000/insertwishlistdata`, {
          Title: Title,
          Year: Year,
          Poster: Poster,
          price: price,
          quantity: quantity,
          imdbID: imdbID,
        })

        .then((response) => {
          console.log(response);
          //dispatch(setwishlistproduct(response.data[0]));
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function removefromwishlistdata(id, imdbID) {
  return async function deletewishlistproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));

    try {
      await axios
        .delete(`http://localhost:5000/removewishlistdetails/${id}`)

        .then((response) => {
          dispatch(removefromwishlist(imdbID));
          console.log(imdbID);
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function searchproductbytitle(title) {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`http://localhost:5000/getpostersbytitle/${title ? title : "no"}`)

        .then((response) => {
          dispatch(searchproducts(response.data));
          dispatch(setstatus(STATUSES.IDLE));
          console.log(response.data);
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
