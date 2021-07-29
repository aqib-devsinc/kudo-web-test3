/* eslint-disable no-restricted-imports */

import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { ProjectCard, ProjectList } from "../../widgets";
import { SearchBar } from "../../../layout/components/extras/SearchBar";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 10 * 5 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    indicator: {
      backgroundColor: "white",
    },
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [view, setView] = React.useState("grid");

  function handleChangeView(event) {
    if (event === 'grid') setView('grid');

    if (event === 'list') setView('list');
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <div className="row flex-row justify-content-between mx-10">
        <div>
          <h2 className="mt-4 ml-10">
            <strong>Open Project</strong>
          </h2>
        </div>
        <div>
          <AppBar
            position="static"
            style={{
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="none"
              textColor="inherit"
              variant="standard"
            >
              <Tab label="My Projects(3)" />
              <Tab label="Shared with me(3)" />
              <Tab label="Public projects(5)" />
            </Tabs>
          </AppBar>
        </div>
        <div className="mt-4 ml-10 float-right">
          <img
            src={
              process.env.PUBLIC_URL +
              "/media/svg/icons/Layout/Layout-4-blocks.svg"
            }
            className={
              view === "grid" ? "isActive mr-2 p-2 rounded" : "mr-2 p-2 rounded"
            }
            alt="icons"
            view={view}
            onClick={(e) => handleChangeView("grid")}
          />
          <img
            src={
              process.env.PUBLIC_URL +
              "/media/svg/icons/Layout/Layout-left-panel-2.svg"
            }
            className={
              view === "list"
                ? "isActive  mr-2 p-2 rounded "
                : " mr-2 p-2 rounded"
            }
            alt="icons"
            view={view}
            onClick={(e) => handleChangeView("list")}
          />
        </div>

        <hr className="col-lg-12" />

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div>
            <div className="float-right bg-white mr-15">
              <SearchBar />
            </div>
            <div className="p-2"></div>
            {view === "grid" ? (
              <TabContainer dir={theme.direction}>
                <div className="row">
                  <div className="col-lg-4">
                    <ProjectCard className="card-stretch gutter-b" />
                  </div>

                  <div className="col-lg-4">
                    <ProjectCard className="card-stretch gutter-b" />
                  </div>

                  <div className="col-lg-4">
                    <ProjectCard className="card-stretch gutter-b" />
                  </div>
                </div>
              </TabContainer>
            ) : (
              <TabContainer dir={theme.direction}>
                <div className="row flex-column">
                  <div className="col-lg-12">
                    <ProjectList className="card-stretch gutter-b" />
                  </div>

                  <div className="col-lg-12">
                    <ProjectList className="card-stretch gutter-b" />
                  </div>

                  <div className="col-lg-12">
                    <ProjectList className="card-stretch gutter-b" />
                  </div>
                </div>
              </TabContainer>
            )}
          </div>
          <TabContainer dir={theme.direction}>
            <div className="row">
              <div className="col-xl-4">
                <ProjectCard className="card-stretch gutter-b" />
              </div>

              <div className="col-xl-4">
                <ProjectCard className="card-stretch gutter-b" />
              </div>

              <div className="col-xl-4">
                <ProjectCard className="card-stretch gutter-b" />
              </div>
            </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <div className="row">
              <div className="col-xl-4">
                <ProjectCard className="card-stretch gutter-b" />
              </div>

              <div className="col-xl-4">
                <ProjectCard className="card-stretch gutter-b" />
              </div>

              <div className="col-xl-4">
                <ProjectCard className="card-stretch gutter-b" />
              </div>
            </div>
          </TabContainer>
        </SwipeableViews>
      </div>
    </div>
  );
}
