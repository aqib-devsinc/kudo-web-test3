import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { VIEW_TYPE, PROJECT_TABS } from 'constants/home';
import ProjectCard from './ProjectCard';

export default function ProjectsList({ view, projects, tab, searchTerm }) {
  const theme = useTheme();

  if (!projects.length) {
    return (
      <TabContainer dir={theme.direction}>
        {(tab === PROJECT_TABS.private.value && !searchTerm) ? <h2>Time to create your first glossary!</h2> : ''}
      </TabContainer>
    );
  }

  return (
    <TabContainer dir={theme.direction}>
      <div className={`row ${view === VIEW_TYPE.grid ? '' : 'flex-column'}`}>
        {
          projects.map((project) => (
            <div key={project.id} className={view === VIEW_TYPE.grid ? 'col-sm-6 col-md-4 col-xl-3' : 'col'}>
              <ProjectCard view={view} project={project} tab={tab} />
            </div>
          ))
        }
      </div>
    </TabContainer>
  );
}

ProjectsList.propTypes = {
  view: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  tab: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

function TabContainer({ children, dir }) {
  return (
    <Typography component='div' dir={dir} className='overflow-hidden'>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};
