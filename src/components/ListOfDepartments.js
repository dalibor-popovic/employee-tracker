import { useEffect } from "react";
import "./ListOfDepartments.css";
//Compnents
import Department from "./Department";
//Redux
import { setDepartments, selectDepartments } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";
//Firebase
import { db } from "../firebase/Firebase";
//Animations
import { motion } from "framer-motion";

const ListOfDepartments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = db
      .collection("Departments")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        let departmentsData = [];
        snapshot.forEach((doc) => {
          departmentsData.push({
            ...doc.data(),
            id: doc.id,
            createdAt: new Date().toUTCString(),
          });
        });

        dispatch(setDepartments(departmentsData));
      });

    return unsub;
  }, [dispatch]);

  const departments = useSelector(selectDepartments);

  return (
    <div className='departments'>
      <h3>Deapartments:</h3>
      <div className='departments-list'>
        {departments.map((department) => (
          <motion.div key={department.id} layout>
            <Department department={department} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ListOfDepartments;
