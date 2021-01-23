import { useEffect } from "react";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//Redux
import {
  selectDepartments,
  selectEmployees,
  filterEmployees,
  selectSelectedDepartment,
  setSelectedDepartment,
} from "../features/appSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 768,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectDepartmentDropdown = () => {
  const dispatch = useDispatch();

  const departments = useSelector(selectDepartments);
  const employees = useSelector(selectEmployees);
  const selectedDepartment = useSelector(selectSelectedDepartment);

  const classes = useStyles();

  const handleChange = (event) => {
    dispatch(setSelectedDepartment(event.target.value));
  };

  useEffect(() => {
    const depIds = departments.map((dep) => dep.id);
    const filteredState = () => {
      switch (selectedDepartment) {
        case "Unassigned":
          dispatch(
            filterEmployees(
              employees.filter(
                (employee) =>
                  !depIds.some((v) => employee.departmentId.includes(v))
              )
            )
          );
          break;
        default:
          dispatch(
            filterEmployees(
              employees.filter((employee) =>
                employee.departmentId.includes(selectedDepartment)
              )
            )
          );
      }
    };
    filteredState();
  }, [selectedDepartment, departments, employees, dispatch]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Select Department</InputLabel>
        <Select value={selectedDepartment} onChange={handleChange}>
          {departments.map((department) => (
            <MenuItem key={department.id} value={department.id}>
              {department.name}
            </MenuItem>
          ))}

          <MenuItem value='Unassigned'>Unassigned employees</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectDepartmentDropdown;
