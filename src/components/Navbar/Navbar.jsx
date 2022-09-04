import React from "react";
import { GrCart } from "react-icons/gr";
import "./Navbar.css";

function Navbar(props) {
  if (props.isCartOpen)
    return (
      <div className="navbar">
        <h2 className="nav__title">{"TeeStore".toUpperCase().trim()}</h2>
        <GrCart
          className={`nav__cart nav__cart__open`}
          onClick={props.cartBtnHandler}
        />
      </div>
    );
  else
    return (
      <div className="navbar">
        <h2 className="nav__title">{"TeeStore".toUpperCase().trim()}</h2>
        <GrCart className={`nav__cart`} onClick={props.cartBtnHandler} />
      </div>
    );
}

export default Navbar;
