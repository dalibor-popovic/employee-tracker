import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    departments: [],
    employees: [],
    filteredEmployees: [],
    selectedDepartment: "",
    editEmployee: null,
    selectedDepartmentID: [],
    toggleEmployee: true,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    filterEmployees: (state, action) => {
      state.filteredEmployees = action.payload;
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    setEditEmployee: (state, action) => {
      state.editEmployee = action.payload;
    },
    setSelectedDepartmentID: (state, action) => {
      state.selectedDepartmentID = action.payload;
    },
    setToggleEmployee: (state, action) => {
      state.toggleEmployee = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setDepartments,
  setEmployees,
  filterEmployees,
  setSelectedDepartment,
  setEditEmployee,
  setSelectedDepartmentID,
  setToggleEmployee,
} = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectDepartments = (state) => state.app.departments;
export const selectEmployees = (state) => state.app.employees;
export const selectFilteredEmployees = (state) => state.app.filteredEmployees;
export const selectSelectedDepartment = (state) => state.app.selectedDepartment;
export const selectEditEmployee = (state) => state.app.editEmployee;
export const selectSelectedDepartedID = (state) =>
  state.app.selectedDepartmentID;
export const selectToggleEmployee = (state) => state.app.toggleEmployee;

export default appSlice.reducer;
