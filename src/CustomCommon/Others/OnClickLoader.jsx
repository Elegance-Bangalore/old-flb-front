import React from "react";
import Spinner from 'react-bootstrap/Spinner';


function OnClickLoader({ color = "#00a76f" }) {
  return (
    <div>
      <Spinner animation="border" style={{ color: color }} />
    </div>
  );
}

export default OnClickLoader;
