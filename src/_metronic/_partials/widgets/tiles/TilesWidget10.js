/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { TextField } from "@material-ui/core";
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-input": {
      color: "blue",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#3699ff",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3699ff",
    },
  },
});

export function TilesWidget10({ className, widgetHeight = "200px" }) {
  const classes = useStyles();
  return (
    <>
      <div
        className={`card card-custom ${className}`}
        style={{
          height: widgetHeight,
          backgroundImage: `url(
            ${process.env.PUBLIC_URL + "/media/svg/custom/tile-bg.svg"}
          )`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundColor: "#f2f2f2",
        }}
      >
        {/* begin::Body */}
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
          <div className="mr-2 col-lg-6">
            <h3 className="font-weight-bolder text-primary">
              Create New Project
            </h3>
            <div className="text-dark-50 font-size-lg mt-2 ">
              <TextField
                className={classes.root}
                id="outlined-email-input"
                label="Enter Project name"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    background: "white",
                    width: "100%",
                  },
                }}
              />
            </div>
            <a href="#" className="btn btn-primary font-weight-bold py-3 px-6 mt-6">
              Create Project
            </a>
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  );
}
