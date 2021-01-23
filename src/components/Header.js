import React from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase/Firebase";

const Header = () => {
  const logout = () => {
    return auth.signOut();
  };

  return (
    <div className='header'>
      <h3 className='logo'>HR Tool</h3>
      <Button color='inherit' className='logout-button' onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
