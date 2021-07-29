import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Backdrop, Paper } from '@material-ui/core';
import SVG from 'react-inlinesvg';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  getProjectRequest,
  setProjectGlossary,
  setCurrentProject,
  setProjectGlossaryProcessable,
} from 'redux/actions/projects';
import urls from 'constants/urls';
import Glossary from 'components/ProjectDetails/Glossary';
import TermExtractor from 'components/ProjectDetails/TermExtractor';
import Entities from 'components/ProjectDetails/Entities';
import FileUploaded from 'components/ProjectDetails/FileUploaded';
import SubHeader from 'components/ProjectDetails/SubHeader';
import { useStyles } from 'styles/projectDetails';
import { PROJECT_TYPES } from 'constants/project';
import { showToast } from 'redux/actions/toast';

let client = {};

export default function ProjectDetails() {
  const [isConnected, setConnected] = useState(false);
  const [isGlossaryProcessing, setGlossaryProcessing] = useState(false);
  const [entities, setEntities] = useState([]);
  const [locationKeys, setLocationKeys] = useState([])
  let token = useSelector(({ auth }) => auth.token);
  const { project, glossary } = useSelector(({ projects }) => ({
    project: projects.current,
    glossary: projects.glossary,
  }));
  const breadcrumbsRef = useRef();
  const dispatch = useDispatch();
  const { url, params: { projectId } } = useRouteMatch();
  const classes = useStyles();
  const history = useHistory();

  breadcrumbsRef.current = [
    {
      title: 'Home',
      pathname: urls.home,
    },
    {
      title: project.name,
      pathname: url,
    },
  ];

  useEffect(() => history.listen((location) => {
    if (history.action === 'PUSH') {
      setLocationKeys([location.key])
    }

    if (history.action === 'POP') {
      if (locationKeys[1] === location.key) {
        setLocationKeys(([_, ...keys]) => keys)
      }

      if (!location.search && url === location.pathname) {
        history.goBack();
      }
    }
  }), [locationKeys]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getProjectRequest(projectId));
  }, [projectId]);

  useEffect(() => {
    if (glossary.glossary_processing !== undefined) setGlossaryProcessing(glossary.glossary_processing);
  }, [glossary.glossary_processing]);

  useEffect(() => {
    if (project.type === PROJECT_TYPES.blankProject.id) setGlossaryProcessing(false);
  }, [project]);

  useEffect(() => {
    if (!token) return;

    token = window.btoa(token);

    if (!isConnected) {
      client = new WebSocket(`${process.env.REACT_APP_SOCKETS_BASE_URL}/projects/${projectId}?token=${token}`);
    }

    client.onopen = function () {
      setConnected(true);
    };

    client.onerror = function (error) {
    };

    client.onclose = function (error) {
      setConnected(false);
    };

    client.onmessage = function (e) {
      const message = JSON.parse(e.data);

      switch (message.MESSAGE_TYPE) {
        case 'GLOSSARY_PROCESSING_STARTED':
          setGlossaryProcessing(true);
          break;
        case 'GLOSSARY_PROCESSING_SUCCESS':
          setGlossaryProcessing(false);
          dispatch(showToast({
            type: 'success',
            message: message.MESSAGE_DATA.success,
          }));
          dispatch(setProjectGlossary({
            response: { ...message.MESSAGE_DATA.data.glossary },
            reset: true,
          }));
          dispatch(setCurrentProject(message.MESSAGE_DATA.data.project.project));
          setEntities(message.MESSAGE_DATA.data.entities.entities);
          break;

        case 'GLOSSARY_PROCESSING_FAILURE':
          setGlossaryProcessing(false);
          dispatch(showToast({
            type: 'error',
            message: message.MESSAGE_DATA.error,
          }))
          dispatch(setProjectGlossaryProcessable({ glossary_processable: false }));
          dispatch(setCurrentProject(message.MESSAGE_DATA.data.project));
          break;

        default:
          break;
      }
    };
  }, [])

  useEffect(() => () => {
    client.close();
  }, []);

  if (!Object.keys(project).length) return null;

  const isBlankProject = project.type !== PROJECT_TYPES.blankProject.id;
  const isUploadDocsProject = project.type === PROJECT_TYPES.uploadDocs.id;
  const isUrlProject = project.type === PROJECT_TYPES.websiteUrl.id;
  const isKeywordsProject = project.type === PROJECT_TYPES.projectInfo.id;

  return (
    <>
      <div
        className={`col bg-white mb-3 d-flex align-items-stretch justify-content-between ${classes.subHeaderPadding}`}
      >
        <div className='m-3 d-flex align-items-center'>
          <h1>{project.name}</h1>
          <span className='ml-5 text-muted mb-2'>
            {Object.values(PROJECT_TYPES).find((proj) => proj.id === project.type).title}
            {isBlankProject ? ' Glossary' : ''}
          </span>
        </div>
        <SubHeader />
      </div>
      {
        isBlankProject && (
          <Backdrop className={classes.backdrop} open={isGlossaryProcessing}>
            <p className='mr-2'>Processing Glossary...</p>
            <CircularProgress color='inherit' />
          </Backdrop>
        )
      }
      <div className='container p-0'>
        <div className='my-7'>
          <Glossary setGlossaryProcessing={setGlossaryProcessing} />
        </div>
        {
          isUploadDocsProject && (
            <div className='mb-7'>
              <TermExtractor />
            </div>
          )
        }
        <div>
          <Row>
            <Col md={12} lg={6}>
              { isBlankProject && <Entities entitiesFromSocket={entities} /> }
              <Col className='d-flex justify-content-between p-0 pb-4'>
                <Row className='justify-content-space-between w-100' noGutters>
                  <Col>
                    <Paper className={`p-4 mr-2 ${classes.bgPrimary}`}>
                      <div className='mb-4'>
                        <SVG src='/media/svg/icons/Layout/Layout-4-blocks.svg' />
                      </div>
                      <h4 className='text-white font-weight-bold'>{ glossary.statistics?.number_of_terms ?? 0 }</h4>
                      <p className='text-white'>Number of terms</p>
                    </Paper>
                  </Col>
                  <Col>
                    <Paper className='p-4'>
                      <div className='mb-4'>
                        <SVG src='/media/svg/icons/Files/Group.svg' />
                      </div>
                      <h4 className='font-weight-bold'>{ glossary.statistics?.missing_translations ?? 0 }</h4>
                      <p className='text-muted'>Missing Translations</p>
                    </Paper>
                  </Col>
                  <Col>
                    <Paper className='p-4 ml-2'>
                      <div className='mb-4'>
                        <SVG src='/media/svg/icons/Layout/Layout-grid.svg' />
                      </div>
                      <h4 className='font-weight-bold'>{ glossary.statistics?.number_of_entities ?? 0 }</h4>
                      <p className='text-muted'>Number of entities</p>
                    </Paper>
                  </Col>
                </Row>
              </Col>
            </Col>
            <Col md={12} lg={6}>
              { isUploadDocsProject && <FileUploaded /> }
              { isUrlProject
                && (
                  <Paper className={`${classes.projectUrl} p-4 word-break`}>
                    <h3 className='mb-15'>URL</h3>
                    <a href={project.url}>{project.url}</a>
                  </Paper>
                )}
              { isKeywordsProject
                && (
                  <Paper className={`${classes.projectKeywords} p-4`}>
                    <h3 className='mb-10'>Keywords</h3>
                    <p>{project.keywords.map((keyword) => keyword).join(', ')}</p>
                  </Paper>
                )}
            </Col>
          </Row>
        </div>

      </div>
    </>
  );
}
