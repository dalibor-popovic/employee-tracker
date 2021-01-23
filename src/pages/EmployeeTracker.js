import React from "react";
import "./EmployeeTracker.css";
import Employees from "../components/Employees";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const EmployeeTracker = () => {
  return (
    <div className='emplayee-tracker'>
      <Header />
      <div className='main'>
        <SideBar />
        <Employees />
      </div>
    </div>
  );
};

export default EmployeeTracker;
