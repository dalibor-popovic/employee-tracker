import "./Employees.css";
import AddEmployee from "./AddEmployee";
import ListOfEmployees from "./ListOfEmployees";
import Chart from "./Chart";

const Employees = () => {
  return (
    <div className='employees-container'>
      <div className='employees'>
        <AddEmployee />
        <ListOfEmployees />
        <Chart />
      </div>
    </div>
  );
};

export default Employees;
