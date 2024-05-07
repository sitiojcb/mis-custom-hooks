import { useState } from "react";
//import PropType from "prop-types";
//recordar export para poder usarlo...
export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = (value = 1) => {
    // setCounter(counter + value);
    setCounter((current) => current + value);
  };
  const decrement = (value = 1) => {
    if (counter === 0) return;
    // setCounter(counter - value);
    setCounter((current) => current - value);
  };
  const reset = () => {
    setCounter(initialValue);
  };
  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
// useCounter.protoType = {
//   counter.PropType: Number.isRequired,
// };
