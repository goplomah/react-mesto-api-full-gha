import { useState } from "react";

function useFormValue() {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export default useFormValue;
