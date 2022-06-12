import React, { useRef } from "react";

export default function Form(props) {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const val = inputRef.current.value;
    console.log("Form - handleSubmit - val", val);
    props.handleSubmit(val);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} placeholder="type of giphy" />
      <button>Submit</button>
    </form>
  );
}
