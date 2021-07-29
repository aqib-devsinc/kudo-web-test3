/* eslint-disable no-restricted-imports */
import React from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F2F2F2',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
    border: "6px",
  },
  searchIcon: {
    color: "#DADADA",
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(2, 1, 2, 6),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: 150,
    },
  },
}));

export function SearchBar({ placeholder, wrapperClass, value, handleChange }) {
  const classes = useStyles();

  return (
    <div className={`${classes.search} ${wrapperClass}`}>
      <div className={classes.searchIcon}>
        <SearchIcon  />
      </div>
      <InputBase
        placeholder={placeholder || 'Search'}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "Search" }}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
