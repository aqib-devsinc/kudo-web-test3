import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import urls from 'constants/urls';
import { Row, Col } from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import SVG from 'react-inlinesvg';
import { useSubheader } from '_metronic/layout';
import { PieChart } from 'react-minimal-pie-chart';
import Projects from 'components/Admin/Projects';
import { useStyles } from 'styles/projectDetails';
import { getAdminProjectsStatsRequest } from 'redux/actions/admin';

export default function Dashboard() {
  const breadcrumbsRef = useRef();
  const subHeader = useSubheader();

  const dispatch = useDispatch();
  const projectsStatistics = useSelector(({ admin }) => admin.dashboard.statistics);

  const classes = useStyles();

  breadcrumbsRef.current = [
    {
      title: 'Admin',
      pathname: urls.admin,
    },
    {
      title: 'Dashboard',
      pathname: urls.admin,
    },
  ];

  useEffect(() => {
    subHeader.setBreadcrumbs(breadcrumbsRef.current);
    dispatch(getAdminProjectsStatsRequest());
  }, []);

  const chartData = [
    {
      title: `${(
        ((projectsStatistics?.upload_projects ?? 0)
          / (projectsStatistics?.total_projects ?? 0))
          * 100
      ).toFixed(2)}%`,
      value: projectsStatistics?.upload_projects ?? 0,
      color: '#F64E60',
    },
    {
      title: `${(
        ((projectsStatistics?.blank_projects ?? 0)
          / (projectsStatistics?.total_projects ?? 0))
          * 100
      ).toFixed(2)}%`,
      value: projectsStatistics?.blank_projects ?? 0,
      color: '#8950FC',
    },
    {
      title: `${(
        ((projectsStatistics?.url_projects ?? 0)
          / (projectsStatistics?.total_projects ?? 0))
          * 100
      ).toFixed(2)}%`,
      value: projectsStatistics?.url_projects ?? 0,
      color: '#3699FF',
    },
    {
      title: `${(
        ((projectsStatistics?.keyword_projects ?? 0)
          / (projectsStatistics?.total_projects ?? 0))
          * 100
      ).toFixed(2)}%`,
      value: projectsStatistics?.keyword_projects ?? 0,
      color: '#0BB783',
    },
  ];

  return (
    <div className='container px-0 pt-5'>
      <Projects />
      <div>
        <Row>
          <Col>
            <Col className='d-flex justify-content-between p-0'>
              <Row className='justify-content-space-between w-100' noGutters>
                <Col>
                  <Paper className={`${classes.fileUploaded} mt-7 p-4`}>
                    <div>
                      <h3 className='mb-10 mt-3 d-inline-block ml-5'>Glossaries Types</h3>
                    </div>
                    <Row>
                      <Col>
                        <PieChart
                          viewBoxSize={[100, 50]}
                          center={[50, 20]}
                          data={chartData}
                          lineWidth={20}
                          radius={20}
                          rounded
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className='mb-4 d-flex align-items-center  ml-5'>
                          <SVG src='/media/svg/icons/General/web-url.svg' />
                          <div className='ml-4'>
                            <h4 className='mt-4 mb-0 text-black font-weight-bold'>
                              { projectsStatistics?.url_projects ?? 0 }
                            </h4>
                            <p className='text-muted'>Website/URL</p>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className='mb-4 d-flex align-items-center  mr-5'>
                          <SVG src='/media/svg/icons/General/upload-doc.svg' />
                          <div className='ml-4'>
                            <h4 className='mt-4 mb-0 text-black font-weight-bold'>
                              { projectsStatistics?.upload_projects ?? 0 }
                            </h4>
                            <p className='text-muted'>Uploaded Doc</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className='mb-4 d-flex align-items-center  ml-5'>
                          <SVG src='/media/svg/icons/General/keywords.svg' />
                          <div className='ml-4'>
                            <h4 className='mt-4 mb-0 text-black font-weight-bold'>
                              { projectsStatistics?.keyword_projects ?? 0 }
                            </h4>
                            <p className='text-muted'>Keywords</p>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className='mb-4 d-flex align-items-center  mr-5'>
                          <SVG src='/media/svg/icons/General/blank.svg' />
                          <div className='ml-4'>
                            <h4 className='mt-4 mb-0 text-black font-weight-bold'>
                              { projectsStatistics?.blank_projects ?? 0 }
                            </h4>
                            <p className='text-muted'>Blank</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Paper>
                </Col>
                <Col>
                  <Paper className={`p-4 ml-7 mt-7 ${classes.bgPrimary}`}>
                    <div className='mb-4'>
                      <SVG src='/media/svg/icons/Layout/Layout-4-blocks.svg' />
                    </div>
                    <h4 className='text-white font-weight-bold'>{ projectsStatistics?.total_projects ?? 0 }</h4>
                    <p className='text-white'>Total Glossaries</p>
                  </Paper>
                </Col>
                <Col>
                  <Paper className='p-4 ml-7 mt-7'>
                    <div className='mb-4'>
                      <SVG src='/media/svg/icons/Files/Group.svg' />
                    </div>
                    <h4 className='font-weight-bold'>{ projectsStatistics?.total_interpreters ?? 0 }</h4>
                    <p className='text-muted'>Total Interpreters</p>
                  </Paper>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
}
