import React, { useContext, createContext, useReducer , useEffect} from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Retrieve the cart data from local storage if available
const getInitialCart = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
        },
      ];
    case "REMOVE":
      let newArr = [...state]; // Note : can add to state but cannot remove directly from state
      newArr.splice(action.index, 1); // 1 is the no of items want to remove
      return newArr;

    case "UPDATE":
      return state.map((item) => {
        if (item.id === action.id && item.size === action.size) {
          return {
            ...item,
            qty: action.qty,
            price: action.price,
          };
        } else {
          return item;
        }
      });
    default:
      break;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], getInitialCart);

  // Save the cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);


//  Note:  "state"  refers to the current condition or data of the application at a given moment.
//  states does not persists after a refresh, this is due to the fact that the state is stored 
//  in a temporary or session-specific storage that gets cleared when the page is refreshed.
//  That's the reason behind using localstorage here
