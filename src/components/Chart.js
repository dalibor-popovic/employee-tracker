import { useState, useEffect } from "react";
import "./Chart.css";
import { Bar } from "react-chartjs-2";
//Redux
import { useSelector } from "react-redux";
import { selectEmployees, selectDepartments } from "../features/appSlice";

const Chart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const employees = useSelector(selectEmployees);
  const departments = useSelector(selectDepartments);

  useEffect(() => {
    let labels = [];
    let data = [];

    departments.map(
      (dep) =>
        labels.push(dep.name) |
        data.push(employees.filter((emp) => emp.departmentId.includes(dep.id)))
    );

    setData({
      labels,
      datasets: [
        {
          data: data.map((el) => el.length),
          backgroundColor: "rgba(29,125,239,0.2)",
          borderColor: "rgba(29,125,239,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(29,125,239,0.4)",
          hoverBorderColor: "rgba(29,125,239,1)",
          label: "Employees per department",
        },
      ],
    });
  }, [departments, employees]);

  return (
    <div className='chart-container'>
      <Bar data={data} />
    </div>
  );
};

export default Chart;
