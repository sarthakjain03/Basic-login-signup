import React from "react";
import { NavLink } from "react-router-dom";

const Landingpage = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{margin: "10px"}}>Hello</h1>
      <NavLink to={"/login"} key={"login"}>
        <button style={{ padding: "10px", margin: "10px" }}>Login</button>
      </NavLink>
      <NavLink to={"/signup"} key={"signup"}>
        <button style={{ padding: "10px", margin: "10px" }}>Sign Up</button>
      </NavLink>
    </div>
  );
};

export default Landingpage;
