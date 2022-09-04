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
        <p className="card__desc__gender">{props.gender}</p>
        {/* M means "for men", W means for women */}
        <p className="card__desc__quantity">Quantity: {props.quantity}</p>
        <h1 className="card__price">Rs {props.price}</h1>
        {/* add to cart does'nt work */}
        <button onClick={(props)=>{
          console.log(props.name);
        }} className="card__btn">Add to cart</button>
      </div>
    </div>
  );
}

export default card;
