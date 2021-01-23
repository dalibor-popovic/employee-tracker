import { useState } from "react";
import "./AddDepartmentForm.css";
//Material UI
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
//Animation
import { motion } from "framer-motion";
import { fromTop } from "../animations";
//Firebase
import { db, createdAt } from "../firebase/Firebase";

const AddDepartmentForm = ({ setToggleDepartment, setSuccesAlert }) => {
  const [newDepartment, setNewDepartment] = useState("");

  const addDepartment = (e) => {
    db.collection("Departments")
      .add({
        name: newDepartment,
        createdAt,
      })
      .then(
        setNewDepartment(""),
        setToggleDepartment(false),
        setSuccesAlert(true)
      );

    e.preventDefault();
  };

  const DeaprtmentName = (e) => {
    setNewDepartment(e.target.value);
  };

  return (
    <div className='hide'>
      <motion.div
        initial='hidden'
        animate='show'
        exit='exit'
        variants={fromTop}
      >
        <form onSubmit={addDepartment}>
          <div className='add-department-from'>
            <TextField
              value={newDepartment}
              onChange={DeaprtmentName}
              fullWidth
              label='Department Name'
              required={true}
            />
            <IconButton type='submit' className='add-icon'>
              <AddIcon />
            </IconButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddDepartmentForm;
