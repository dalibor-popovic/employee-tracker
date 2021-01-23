import React from "react";
import "./Alert.css";
//Material UI
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
//Animations
import { motion } from "framer-motion";
import { alertLine, fromBottom } from "../animations";

const Alert = ({ Name, Action }) => {
  return (
    <motion.div
      initial='hidden'
      animate='show'
      exit='exit'
      variants={fromBottom}
      className='alert'
    >
      <div className='alert-message'>
        <CheckCircleOutlineIcon />
        <h5>
          {Name} successfully {Action}!
        </h5>
      </div>

      <div className='progress'>
        <motion.div
          initial='hidden'
          animate='show'
          variants={alertLine}
          className='progress-line'
        />
      </div>
    </motion.div>
  );
};

export default Alert;
