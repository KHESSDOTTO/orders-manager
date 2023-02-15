import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/pages/home";
import { NavBar } from "./components/navBar";
import Checkout from "./components/pages/checkout/checkout";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
