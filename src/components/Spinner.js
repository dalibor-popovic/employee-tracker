import React from "react";
import { ReactComponent as Spin } from "../assets/spin.svg";

const Spinner = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default Spinner;
