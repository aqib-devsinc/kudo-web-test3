import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import {
  AppBar,
  Tabs,
  Tab,
  useTheme,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import { SearchBar } from '_metronic/layout/components/extras/SearchBar';
import { getProjectsRequest, getSearchedProjectsRequest } from 'redux/actions/projects';
import { PROJECT_TABS, VIEW_TYPE } from 'constants/home';
import { useStyles } from 'styles/home';
import url from 'constants/urls';
import ProjectsList from './ProjectsList';

const { PUBLIC_URL } = process.env;

export default function HomeBody() {
  const [tab, setTab] = useState({
    index: PROJECT_TABS.private.index,
    value: PROJECT_TABS.private.value,
    label: PROJECT_TABS.private.label,
  });
  const [view, setView] = useState(VIEW_TYPE.grid);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectTypeMenuanchorEl, setProjectTypeMenuAnchorEl] = useState(null);
  const swipeableViewsRef = useRef();

  const { allProjectsObj } = useSelector(({ projects }) => ({ allProjectsObj: projects }));

  const {
    activeProjectType,
    privateProjects,
    sharedProjects,
    publicProjects,
    allProjects,
    searchedProjects,
  } = useSelector(({ projects }) => ({
    activeProjectType: projects[tab.value],
    privateProjects: projects.private.data,
    sharedProjects: projects.shared.data,
    publicProjects: projects.public.data,
    allProjects: projects.all.data,
    searchedProjects: projects.search,
  }));

  const [projects, setProjects] = useState({
    private: privateProjects,
    shared: sharedProjects,
    public: publicProjects,
    all: allProjects,
  });
  const [pagination, setPagination] = useState({
    nextPage: activeProjectType.next_page,
    hasMore: activeProjectType.current_page !== activeProjectType.total_pages,
  });

  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!privateProjects.length) dispatch(getProjectsRequest({ type: PROJECT_TABS.private.value }));
    if (!sharedProjects.length) dispatch(getProjectsRequest({ type: PROJECT_TABS.shared.value }));
    if (!publicProjects.length) dispatch(getProjectsRequest({ type: PROJECT_TABS.public.value }));
    if (!allProjects.length) dispatch(getProjectsRequest({ type: PROJECT_TABS.all.value }));
  }, []);

  useEffect(() => {
    resetProjects();
    setPagination(calculatePaginationValues(activeProjectType));
  }, [privateProjects, sharedProjects, publicProjects, allProjects]);

  useEffect(() => {
    setPagination(calculatePaginationValues(activeProjectType));
  }, [activeProjectType]);

  useEffect(() => {
    if (searchTerm) {
      setSearchedProjects();
    } else {
      resetProjects();
    }
  }, [searchTerm, searchedProjects]);

  useEffect(() => {
    swipeableViewsRef.current.getChildContext().swipeableViews.slideUpdateHeight();
  }, [projects, view]);

  function resetProjects() {
    setProjects({
      private: privateProjects,
      shared: sharedProjects,
      public: publicProjects,
      all: allProjects,
    });
  }

  function setSearchedProjects() {
    setPagination(calculatePaginationValues(searchedProjects));
    setProjects((previousProjects) => ({
      ...previousProjects,
      [tab.value]: searchedProjects.data,
    }));
  }

  function handleChangeView(updatedView) {
    setView(updatedView);
  }

  function handleTabChange(event, newValue) {
    setTabValue(newValue);
  }

  function handleSwipeTab(index) {
    setTabValue(index);
  }

  function setTabValue(index) {
    setProjectTypeMenuAnchorEl(null);
    const activeProject = Object.values(PROJECT_TABS).find((projectTab) => projectTab.index === index);
    setTab({
      index: activeProject.index,
      value: activeProject.value,
      label: activeProject.label,
    });

    if (searchTerm) setSearchTerm('');
  }

  function calculatePaginationValues(displayedProjects) {
    return {
      nextPage: displayedProjects.next_page,
      hasMore: displayedProjects.current_page !== displayedProjects.total_pages,
    };
  }

  const fetchMoreProjects = () => {
    if (searchTerm) {
      dispatch(getSearchedProjectsRequest({
        type: tab.value,
        searchTerm,
        page: pagination.nextPage,
      }));
      return;
    }

    dispatch(getProjectsRequest({
      type: tab.value,
      page: pagination.nextPage,
    }));
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearchTerm(value);

    if (!value.trim().length) return;

    if (!value) {
      setPagination(calculatePaginationValues(activeProjectType));
      return;
    }

    setPagination({
      nextPage: 1,
      hasMore: false,
    });
    dispatch(getSearchedProjectsRequest({
      searchTerm: value,
      type: tab.value,
    }));
  };

  const handleProjectsTypeMenuClick = (event) => {
    setProjectTypeMenuAnchorEl(event.currentTarget);
  };

  const handleProjectsTypeMenuClose = () => {
    setProjectTypeMenuAnchorEl(null);
  };

  return (
    <div id='home-body' className={classes.root}>
      <div className='d-flex'>

        <div className={`col-lg-2 ${classes.sideBar} ${classes.displaySideBar} border-right text-center`}>
          <Link
            className='btn btn-primary btn-lg mt-5 h-20'
            type='button'
            to={url.newProject}
          >
            <SVG src='/media/svg/icons/Navigation/Plus.svg' />
            <strong className='ml-2'>New Glossary</strong>
          </Link>
          <hr className='w-100 pX-5' />
          <div>
            <AppBar
              position='static'
              style={{
                boxShadow: 'none',
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}
            >
              <Tabs
                value={tab.index}
                onChange={handleTabChange}
                indicatorColor='none'
                textColor='black'
                variant='standard'
                orientation='vertical'
              >
                {
                  Object.values(PROJECT_TABS).map((projectTab) => (
                    <Tab
                      key={projectTab.value}
                      label={(
                        <span className='d-flex flex-row align-items-stretch justify-content-between'>
                          <div>{projectTab.label}</div>
                          <div>{allProjectsObj[projectTab.value].total_records}</div>
                        </span>
                      )}
                      className={classes.tab}
                    />
                  ))
                }
              </Tabs>
            </AppBar>
          </div>
        </div>

        <div className='col px-0'>
          <div className='bg-white d-flex justify-content-between align-items-center'>
            <h2 className={`ml-5 ${classes.displaySideBar}`}>
              <strong>{tab.label.toUpperCase()}</strong>
            </h2>

            <div className={`bg-gray m-3 rounded d-inline-block ${classes.displayProjectsMenu} flex-row`}>
              <Link to={url.newProject}>
                <button className='btn btn-primary ml-2' type='button'>
                  <SVG src='/media/svg/icons/Navigation/Plus.svg' className='mr-2' />
                  New Glossary
                </button>
              </Link>
            </div>

            <div className='d-flex mr-3'>
              <span className='bg-gray m-3 rounded d-inline-block'>
                <SearchBar
                  wrapperClass='m-0'
                  value={searchTerm}
                  handleChange={handleSearchChange}
                />
              </span>
              <span className='d-flex mt-2'>
                <span
                  onClick={handleChangeView.bind(this, VIEW_TYPE.grid)}
                  onKeyUp={handleChangeView.bind(this, VIEW_TYPE.grid)}
                  className='pointer d-flex flex-column'
                  role='presentation'
                >
                  <small className='ml-1'>Grid</small>
                  <img
                    src={`${PUBLIC_URL}/media/svg/icons/Layout/Layout-4-blocks.svg`}
                    className={`mr-2 p-2 rounded ${view === VIEW_TYPE.grid ? 'isActive' : ''}`}
                    alt='grid-view'
                    height={30}
                    width={30}
                  />
                </span>
                <span
                  onClick={handleChangeView.bind(this, VIEW_TYPE.list)}
                  onKeyUp={handleChangeView.bind(this, VIEW_TYPE.list)}
                  className='pointer d-flex flex-column'
                  role='presentation'
                >
                  <small className='ml-2'>List</small>
                  <img
                    src={`${PUBLIC_URL}/media/svg/icons/Layout/Layout-left-panel-2.svg`}
                    className={`mr-2 p-2 rounded ${view === VIEW_TYPE.list ? 'isActive' : ''}`}
                    alt='list-view'
                    height={30}
                    width={30}
                  />
                </span>
              </span>
            </div>
          </div>

          <div className='row'>
            <div className={`pl-10 pt-5 ${classes.displayProjectsMenu}`}>
              <Button className='btn btn-lg btn-white' onClick={handleProjectsTypeMenuClick}>
                {tab.label.toUpperCase()}
                {`  (${allProjectsObj[tab.value].total_records})`}
                <SVG src='/media/svg/icons/General/drop-down-arrow.svg' height={12} width={12} />
              </Button>
              <Menu
                id='fade-menu'
                anchorEl={projectTypeMenuanchorEl}
                keepMounted
                open={!!projectTypeMenuanchorEl}
                onClose={handleProjectsTypeMenuClose}
              >
                {
                  Object.values(PROJECT_TABS).map((projectTab) => (
                    <MenuItem onClick={setTabValue.bind(this, projectTab.index)}>
                      {projectTab.label.toUpperCase()}
                    </MenuItem>
                  ))
                }
              </Menu>
            </div>
          </div>

          <div
            className={`${classes.projectsDiv} content mx-5`}
            id='scrollableDiv'
          >
            <InfiniteScroll
              scrollableTarget='scrollableDiv'
              dataLength={projects[tab.value].length}
              next={fetchMoreProjects}
              hasMore={pagination.hasMore}
              loader={<p className='text-center font-weight-bold'>Loading...</p>}
              // endMessage={projects[tab.value].length ? (
              //   <p className='text-center font-weight-bold'>No more projects to show</p>
              // ) : null}
            >
              <SwipeableViews
                id='scrollable-updated'
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tab.index}
                onChangeIndex={handleSwipeTab}
                ref={swipeableViewsRef}
                animateHeight
              >
                {
                  Object.values(PROJECT_TABS).map((projectTab) => (
                    <div key={projectTab.value}>
                      <ProjectsList
                        view={view}
                        projects={projects[projectTab.value]}
                        tab={projectTab.value}
                        searchTerm={searchTerm}
                      />
                    </div>
                  ))
                }
              </SwipeableViews>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
