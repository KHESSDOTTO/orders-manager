import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/pages/home";
import { NavBar } from "./components/navBar";
import Checkout from "./components/pages/checkout/checkout";
import { ProductDetails } from "./components/pages/productDetails";
import { Orders } from "./components/pages/orders";
import { useState } from "react";

function App() {
  const order = [];

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Checkout order={order} />} />
        <Route
          path="/productDetails/:productID"
          element={<ProductDetails order={order} />}
        />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
