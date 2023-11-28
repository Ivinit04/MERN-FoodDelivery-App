import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../screens/Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const navigate = useNavigate();
  let data = useCart();

  const [cartView , setCartView] = useState(false);

  function handleLogout(){
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* me- (end) for classes that set margin-right or padding-right in LTR, margin-left or padding-left in RTL */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {/* mx - margin for classes that set both *-left and *-right
                my - margin for classes that set both *-top and *-bottom
             */}

            {!localStorage.getItem("authToken") ? (
              <div>
                <Link
                  className="btn bg-white text-success mx-1 my-1"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1 my-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white text-success mx-1 my-1" onClick={()=> {setCartView(true)}}>
                  MyCart {" "}
                  {
                    data.length === 0 ? null : <Badge pill bg="danger">{data.length}</Badge>
                  }
                </Link>

                {
                  cartView ? <Modal onClose={()=>{setCartView(false)}}>
                    <Cart />
                  </Modal> : null
                }

                <button type="button" className="btn bg-white text-danger mx-1 my-1" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
