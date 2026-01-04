import React from "react";

function ShowError({ touched, message }) {
  return <p className="text-danger m-0">{touched && message && message}</p>;
}

export default ShowError;
