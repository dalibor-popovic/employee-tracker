import { useEffect, useState } from "react";
import "./ListOfEmployees.css";
import { DataGrid } from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import { Divider } from "@material-ui/core";
//Redux
import {
  setEmployees,
  selectFilteredEmployees,
  setEditEmployee,
  selectSelectedDepartment,
  selectEditEmployee,
  selectToggleEmployee,
  setToggleEmployee,
} from "../features/appSlice";
import { useSelector, useDispatch } from "react-redux";
//Firebase
import { db } from "../firebase/Firebase";
import DeleteModal from "./DeleteModal";
import SelectDepartmentDropdown from "./SelectDepartmentDropdown";

const ListOfEmployees = () => {
  const [deleteEmployee, setDeleteEmployee] = useState({
    deleteModal: false,
    empId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("Employees")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        let employeesData = [];
        let num = 1;
        snapshot.forEach((doc) => {
          employeesData.push({
            ...doc.data(),
            id: doc.id,
            createdAt: new Date().toUTCString(),
            n: num++,
          });
        });

        dispatch(setEmployees(employeesData));
      });
  }, [dispatch]);

  const filteredEmployees = useSelector(selectFilteredEmployees);
  const selectedDepartment = useSelector(selectSelectedDepartment);
  const editEmployee = useSelector(selectEditEmployee);
  const toggleEmployee = useSelector(selectToggleEmployee);

  const columns = [
    { field: "n", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    {
      field: "lastName",
      headerName: "Last name",
      width: 130,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 180,
    },
    {
      field: "settings",
      headerName: "Settings",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            disabled={!!editEmployee}
            onClick={() => Delete(params.row.id)}
          >
            <DeleteOutlineSharpIcon
              style={{ color: `${!!editEmployee ? "" : "#E84216"}` }}
            />
          </IconButton>
          <IconButton onClick={() => EditEmployee(params.row)}>
            <EditOutlinedIcon style={{ color: "#1d7def" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const Delete = (id) => {
    !editEmployee && setDeleteEmployee({ deleteModal: true, empId: id });
  };

  const EditEmployee = (employee) => {
    !toggleEmployee && dispatch(setToggleEmployee(true));
    selectedDepartment === "Unassigned"
      ? db
          .collection("Employees")
          .doc(employee.id)
          .update({
            departmentId: [],
          })
          .then(
            dispatch(setEditEmployee({ ...employee, selectedDepartmentID: [] }))
          )
      : dispatch(setEditEmployee(employee));
  };

  return (
    <>
      <div className='list-of-employees-container'>
        <div className='select-department-dropdown'>
          <SelectDepartmentDropdown />
        </div>
        <Divider />
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          pageSize={5}
          hideFooterRowCount={true}
          hideFooterSelectedRowCount={true}
        />
      </div>
      {deleteEmployee.deleteModal && (
        <DeleteModal
          name='Employee'
          empId={deleteEmployee.empId}
          onClose={() =>
            setDeleteEmployee({ deleteEmployee: false, empId: "" })
          }
        />
      )}
    </>
  );
};

export default ListOfEmployees;
