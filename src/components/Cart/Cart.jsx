import React from "react";
import "./Cart.css";

function Cart(props) {
  if (props.isCartOpen)
    return (
      <div className="cart">
        <div className="cart__details">
          <table className="cart__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {props.cartData.map((product) => (
                <tr key={product["id"]}>
                  <td>{product["id"]}</td>
                  <td>{product["name"]}</td>
                  <td>{product["price"]}</td>
                  <td>{product["quantity"]}</td>
                  <td>{eval(product["price"] * product["quantity"])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart__summary">
          <h4 className="cart__summary__title">CART TOTAL</h4>
          <h1 className="cart__summary__total">
            Rs. <span>{props.total}</span>
          </h1>
        </div>
      </div>
    );
  else return <></>;
}

export default Cart;
