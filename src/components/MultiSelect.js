import React from "react";
//Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
//Redux
import {
  selectDepartments,
  selectSelectedDepartedID,
  setSelectedDepartmentID,
} from "../features/appSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedDepartmentID, theme) {
  return {
    fontWeight:
      selectedDepartmentID.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const MultipleSelect = () => {
  const dispatch = useDispatch();
  const departments = useSelector(selectDepartments);
  const selectedDepartmentID = useSelector(selectSelectedDepartedID);

  const classes = useStyles();
  const theme = useTheme();
  const onChangeOption = (e) => {
    dispatch(setSelectedDepartmentID(e.target.value));
  };

  return (
    <div>
      <FormControl>
        <Select
          required
          multiple
          value={selectedDepartmentID}
          onChange={onChangeOption}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((selectedId) => (
                <Chip
                  key={selectedId}
                  label={departments.map(
                    (department) =>
                      department.id.includes(selectedId) && department.name
                  )}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {departments.map((department) => (
            <MenuItem
              key={department.id}
              value={department.id}
              style={getStyles(department.name, selectedDepartmentID, theme)}
            >
              {department.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
