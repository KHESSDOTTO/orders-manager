import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/pages/home";
import { NavBar } from "./components/navBar";
import Checkout from "./components/pages/checkout/checkout";
import { ProductDetails } from "./components/pages/productDetails";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/productDetails/:productID" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
