import { useState, useEffect } from "react";
import "./AddEmployee.css";
//Components
import Alert from "./Alert";
//Material UI
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MultipleSelect from "./MultiSelect";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { Button, IconButton } from "@material-ui/core";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
//Animations
import { AnimatePresence, motion } from "framer-motion";
import { height } from "../animations";
//Firebase
import { db, createdAt } from "../firebase/Firebase";
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditEmployee,
  setEditEmployee,
  selectSelectedDepartedID,
  setSelectedDepartmentID,
  setSelectedDepartment,
  selectToggleEmployee,
  setToggleEmployee,
} from "../features/appSlice";

const AddEmployee = () => {
  const [succesAlert, setSuccesAlert] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const editEmployee = useSelector(selectEditEmployee);
  const toggleEmployee = useSelector(selectToggleEmployee);
  const selectedDepartmentID = useSelector(selectSelectedDepartedID);

  useEffect(() => {
    if (editEmployee) {
      setFirstName(editEmployee.firstName);
      setLastName(editEmployee.lastName);
      setEmail(editEmployee.email);
      setPhone(editEmployee.phone);
      dispatch(setSelectedDepartmentID(editEmployee.departmentId));
    }
  }, [editEmployee, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setSuccesAlert(false), 2000);
    return () => clearTimeout(timer);
  }, [succesAlert]);

  const addEmployeeToggle = () => {
    toggleEmployee
      ? dispatch(setToggleEmployee(false))
      : dispatch(setToggleEmployee(true));
  };

  const addEmployee = (e) => {
    !editEmployee
      ? db
          .collection("Employees")
          .add({
            firstName,
            lastName,
            phone,
            email,
            departmentId: selectedDepartmentID,
            createdAt,
          })
          .then(
            setFirstName(""),
            setLastName(""),
            setPhone(""),
            setEmail(""),
            dispatch(setSelectedDepartmentID([])),
            setSuccesAlert(true)
          )
      : db
          .collection("Employees")
          .doc(editEmployee.id)
          .update({
            firstName,
            lastName,
            phone,
            email,
            departmentId: selectedDepartmentID,
          })
          .then(
            setFirstName(""),
            setLastName(""),
            setPhone(""),
            setEmail(""),
            dispatch(setSelectedDepartmentID([])),
            setSuccesAlert(true),
            dispatch(setEditEmployee(null))
          );

    e.preventDefault();
    dispatch(setSelectedDepartment(selectedDepartmentID[0]));
  };

  const cancelEdit = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    dispatch(setSelectedDepartmentID([]));
    dispatch(setEditEmployee(null));
  };

  return (
    <div className='add-employee-section'>
      <div className='add-employee-toggle' onClick={addEmployeeToggle}>
        <MenuOpenIcon />
        <h3>Add new employee</h3>
      </div>
      <motion.div
        variants={height}
        initial={toggleEmployee ? "collapsed" : "open"}
        animate={toggleEmployee ? "collapsed" : "open"}
        className='add-employee-form-container'
      >
        <div className='container'>
          <form onSubmit={addEmployee}>
            <div className='add-employee'>
              <div className='inputs'>
                <div style={{ display: "flex" }}>
                  <TextField
                    required={true}
                    fullWidth
                    placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountCircle className='input-icon' />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    required={true}
                    fullWidth
                    placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountCircle className='input-icon' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div style={{ display: "flex", marginTop: "1rem" }}>
                  <TextField
                    required={true}
                    fullWidth
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailIcon className='input-icon' />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    required={true}
                    fullWidth
                    placeholder='Phone number'
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PhoneAndroidIcon className='input-icon' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  overflow: "hidden",
                  marginTop: "1rem",
                }}
              >
                <div className='select-department'>
                  <h4 className='slect-department-title'>Select Department:</h4>
                  <MultipleSelect />
                  <AnimatePresence>
                    {succesAlert && (
                      <Alert
                        Name='Employee'
                        Action={editEmployee ? "added" : "updated"}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  type='submit'
                  className='add-employee-button'
                  startIcon={<AddCircleIcon />}
                  fullWidth
                >
                  {!editEmployee ? "Add" : "Update"}
                </Button>
                {editEmployee && (
                  <IconButton
                    onClick={cancelEdit}
                    className='cancel-edit-employee'
                  >
                    <CloseSharpIcon />
                  </IconButton>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddEmployee;
