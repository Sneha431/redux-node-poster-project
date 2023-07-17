const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addtocart(state, action) {
      const duplicate = state.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      if (duplicate) {
        state.map((item) => {
          if (item.imdbID === action.payload.imdbID) {
            item.quantity = item.quantity + 1;
          }
        });
      } else {
        state.push(action.payload);
      }
    },

    addtowishlist(state, action) {
      const duplicate = state.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      if (!duplicate) {
        state.push(action.payload);
      }
    },
    removefromcart(state, action) {
      return state.filter((item) => item.imdbID !== action.payload.imdbID);
    },
    clearCart(state) {
      return (state = []);
    },
    inccartquantity(state, action) {
      state.map((item) => {
        if (item.imdbID === action.payload.imdbID) {
          item.quantity = item.quantity + 1;
          // item.price = item.quantity + 1 * item.price;
        }
      });
    },
    deccartquantity(state, action) {
      if (action.payload.quantity >= 1) {
        state.map((item) => {
          if (item.imdbID === action.payload.imdbID) {
            if (item.quantity >= 1) {
              item.quantity = item.quantity - 1;
              // item.price = item.quantity * item.price;
            }
          }
        });
      } else {
        return state.filter((item) => item.imdbID !== action.payload.imdbID);
      }
    },
  },
});

export const cartTotal = (state) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
export const cartTotalqty = (state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0);

export const {
  addtocart,
  removefromcart,
  clearCart,
  inccartquantity,
  deccartquantity,
  carttotalamount,
  cartTotalfunc,
  addtowishlist,
} = cartSlice.actions;
export default cartSlice.reducer;
