import React from "react";
import "./Card.css";

function card(props) {
  return (
    <div className="card">
      <figure>
        <img className="card__img" src={props.imglink} alt={props.imglink} />
        <figcaption className="card__title">{props.title}</figcaption>
      </figure>
      <div className="card__desc div__flex__row">
        <h2 className="card__price">Rs {props.price}</h2>
        <h2 className="card__desc__gender">{props.gender}</h2>
        <h3 className="card__desc__quantity">Quantity: {props.quantity}</h3>
        <button className="card__btn">Add to cart</button>
      </div>
    </div>
  );
}

export default card;
