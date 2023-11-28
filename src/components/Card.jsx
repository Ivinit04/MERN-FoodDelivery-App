import React, { useEffect, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  const options = props.foodItem.options[0]; //object
  const optionsName = Object.keys(options); //array

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(optionsName[0]);
  const [totalPrice, setTotalPrice] = useState(quantity * options[size]);

  let dispatch = useDispatchCart();
  let data = useCart();
 

  function handleQuantity(event) {
    setQuantity(event.target.value);
  }

  function handleSize(event) {
    setSize(event.target.value);
  }

  // This useEffect runs whenever there is change in  quantity and size
  useEffect(() => {
    const price = options[size];
    setTotalPrice(quantity * price);
  }, [quantity, size, options]);

  async function handleAddToCart() {
  const existingItem = data.find(
    (item) => item.id === props.foodItem._id && item.size === size
  );

  if (existingItem) {
    // Item with the same id and size already exists, update it
    const updatedQuantity = parseInt(existingItem.qty) + parseInt(quantity);
    const updatedPrice = existingItem.price + totalPrice;

    await dispatch({
      type: "UPDATE",
      id: props.foodItem._id,
      qty: updatedQuantity,
      price: updatedPrice,
      size: size,
    });
  } else {
    // Item does not exist in the cart, add it
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      qty: quantity,
      size: size,
      price: totalPrice,
    });
  }
}


  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "400px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>

          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={handleQuantity}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              onChange={handleSize}
            >
              {optionsName.map((optionName, index) => {
                return (
                  <option key={index} value={optionName}>
                    {optionName}
                  </option>
                );
              })}
            </select>

            {/* d-inline (display: inline) , fs-5 smallest font size and fs-1 biggest font size */}
            <div className="d-inline h-100 fs-5 ">₹{totalPrice}/-</div>
            <hr />
            <button
              type="button"
              className="btn btn-success ms-2 justify-center"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
