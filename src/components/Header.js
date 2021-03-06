import React from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase/Firebase";
import { useDispatch } from "react-redux";
import { logout } from "../features/appSlice";

const Header = () => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout(false));
    return auth.signOut();
  };

  return (
    <div className='header'>
      <h3 className='logo'>HR Tool</h3>
      <Button color='inherit' className='logout-button' onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
