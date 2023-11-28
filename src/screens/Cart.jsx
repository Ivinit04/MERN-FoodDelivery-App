import React  from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  let totalPrice = data.reduce((total, item) => {
    return total + item.price;
  }, 0); // 0 is initial value of total


  return data.length === 0 ? (
    <div className="ms-5 w-100 text-center text-white fs-3">
      The Cart is Empty!
    </div>
  ) : (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg ">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="text-success">
                Name
              </th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((foodItem, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{foodItem.name}</td>
                  <td>{foodItem.qty}</td>
                  <td>{foodItem.size}</td>
                  <td>{foodItem.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-0"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE",
                          index: index,
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        {" "}
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />{" "}
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price : {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5">Check Out</button>
        </div>
      </div>
    </div>
  );
}
