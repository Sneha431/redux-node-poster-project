import "./App.css";

import Home from "./components/Home";

import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./components/store/store";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import ThankYou from "./components/ThankYou";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";
import Prospect from "./components/Prospect";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persister = persistStore(store);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/MovieList" element={<MovieList />} />

              <Route path="/MovieDetails/:id" element={<MovieDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/Prospect" element={<Prospect />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/Thank-you" element={<ThankYou />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
