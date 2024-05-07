import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  //   const onInputChange = (e) => {
  // console.log(e.target.value);
  // console.log(e.target.name);
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    //console.log(name, value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const onResetForm = () => {
    setFormState(initialForm);
  };
  return {
    ...formState, //expone  username,email y passw
    formState,
    onInputChange,
    onResetForm,
  };
};
