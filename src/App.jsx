import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Signup from "./screens/Signup";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from "./components/ContextReducer.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
