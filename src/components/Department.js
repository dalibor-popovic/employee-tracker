import { useState } from "react";
import "./Department.css";
//Material UI
import { Button, Input } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Divider from "@material-ui/core/Divider";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
//Animations
import { motion, AnimatePresence } from "framer-motion";
import { fromRight } from "../animations";
import DeleteModal from "./DeleteModal";
//Redux
import { useDispatch } from "react-redux";
import { setSelectedDepartment } from "../features/appSlice";
//Firebase
import { db } from "../firebase/Firebase";

const Department = ({ department }) => {
  const [settings, setSettings] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editedDepartmentName, setEditedDepartmentName] = useState(
    `${department.name}`
  );

  const dispatch = useDispatch();

  const deleteDepartment = () => {
    setDeleteModal(true);
  };

  const handleToggle = () => {
    setSettings((prevOpen) => !prevOpen);
  };

  const departmentHandler = () => {
    dispatch(setSelectedDepartment(department.id));
  };

  const editDepartmentName = () => {
    setEdit(true);
  };

  const saveEditedDeparmentName = (e) => {
    db.collection("Departments")
      .doc(department.id)
      .update({ name: editedDepartmentName });
    setEdit(false);
    setSettings(false);
  };

  const closeSttings = () => {
    setEdit(false);
    setSettings(false);
  };

  return (
    <>
      <div className='department'>
        {edit ? (
          <Input
            value={editedDepartmentName}
            onChange={(e) => setEditedDepartmentName(e.target.value)}
          ></Input>
        ) : (
          <Button onClick={departmentHandler} color='inherit'>
            {department.name}
          </Button>
        )}

        <div className='department-settings-container'>
          {!settings && (
            <IconButton
              style={{ position: "absolute", right: 0, top: 9 }}
              onClick={handleToggle}
              size='small'
            >
              <SettingsIcon />
            </IconButton>
          )}
          <AnimatePresence>
            {settings && (
              <div className='hide'>
                <motion.div
                  initial='hidden'
                  animate='show'
                  exit='exit'
                  variants={fromRight}
                  className='department-settings'
                >
                  {edit ? (
                    <>
                      <IconButton
                        size='small'
                        onClick={saveEditedDeparmentName}
                      >
                        <CheckCircleOutlineIcon style={{ color: "#1d7def" }} />
                      </IconButton>
                      <IconButton size='small' onClick={() => setEdit(false)}>
                        <CloseSharpIcon style={{ color: "#E84216" }} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton size='small' onClick={editDepartmentName}>
                        <EditOutlinedIcon style={{ color: "#1d7def" }} />
                      </IconButton>
                      <IconButton size='small' onClick={deleteDepartment}>
                        <DeleteOutlineSharpIcon style={{ color: "#E84216" }} />
                      </IconButton>
                    </>
                  )}
                  <IconButton onClick={closeSttings} size='small'>
                    <HighlightOffIcon />
                  </IconButton>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Divider />
      {deleteModal && (
        <DeleteModal
          name='Department'
          id={department.id}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </>
  );
};

export default Department;
