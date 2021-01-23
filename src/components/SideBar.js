import { useState, useEffect } from "react";
import "./SideBar.css";
//Compnents
import ListOfDepartments from "./ListOfDepartments";
import Alert from "./Alert";
import AddDepartmentForm from "./AddDepartmentForm";
//Material UI
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//Animations
import { AnimatePresence } from "framer-motion";
//Redux
import { selectUser } from "../features/appSlice";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [toggleDepartment, setToggleDepartment] = useState(false);
  const [succesAlert, setSuccesAlert] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    const timer = setTimeout(() => setSuccesAlert(false), 2000);
    return () => clearTimeout(timer);
  }, [succesAlert]);

  const addDepartmentToggle = () => {
    setToggleDepartment((prev) => !prev);
  };

  return (
    <div className='sidebar'>
      <div>
        <div className='user'>
          <Avatar src={user.profilePic}>
            {!user.profilePic && user.username[0]}
          </Avatar>
          <h4 className='user-name'>{user.username}</h4>
        </div>
      </div>
      <Divider />
      <ListOfDepartments />
      <div className='add-department-container'>
        <div className='add-department'>
          <Button
            className='add-department-toggle'
            startIcon={<AddCircleIcon />}
            fullWidth
            onClick={addDepartmentToggle}
          >
            Add Department
          </Button>
          <AnimatePresence>
            {toggleDepartment && (
              <AddDepartmentForm
                setToggleDepartment={setToggleDepartment}
                setSuccesAlert={setSuccesAlert}
              />
            )}

            {succesAlert && <Alert Name='Department' />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
