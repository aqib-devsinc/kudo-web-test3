import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { showToast } from 'redux/actions/toast';
import { getEntities, addTerm, deleteEntity } from 'api/projects';
import { setProjectGlossaryTerms, setProjectGlossaryStats } from 'redux/actions/projects';
import PropTypes from 'prop-types';
import { getLangLabel } from 'helpers/languages';
import { useStyles } from 'styles/projectDetails';

export default function Entities({ entitiesFromSocket }) {
  const [entities, setEntities] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { project, glossary } = useSelector(({ projects }) => ({
    project: projects.current,
    glossary: projects.glossary,
  }));
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    if (!entitiesFromSocket.length) {
      getEntities(projectId).then((response) => {
        if (response.error) return;

        setEntities(response.entities);
      });
    } else {
      setEntities(entitiesFromSocket);
    }
  }, [entitiesFromSocket]);

  const handleAddToGlossary = useCallback((entity, entityIndex) => {
    setSubmitting(true);
    addTerm(projectId, {
      terms: [{
        translations: [{
          name: entity.title,
          language: project.primary_language,
        }],
      }],
    }).then((response) => {
      if (response.error) throw response;

      dispatch(showToast({
        type: 'success',
        message: 'Added entity to glossary',
      }));
      dispatch(setProjectGlossaryTerms({
        terms: [
          ...response.terms,
          ...glossary.terms.splice(response.terms.length - glossary.terms),
        ],
      }));

      dispatch(setProjectGlossaryStats({
        statistics: {
          ...glossary.statistics,
          number_of_terms: glossary.statistics.number_of_terms + 1,
          number_of_entities: (
            glossary.statistics.number_of_entities - 1 ? (glossary.statistics.number_of_entities - 1) : 0
          ),
        },
      }))

      deleteEntity(projectId, entity.id).then(() => {
        const copiedEntities = [...entities];
        copiedEntities.splice(entityIndex, 1);
        setEntities(copiedEntities);
      });
    })
      .catch(() => dispatch(showToast({
        type: 'error',
        message: 'Failed to add entity to glossary',
      })))
      .finally(() => setSubmitting(false));
  });

  if (!entities.length) return null;

  return (
    <Paper className='p-4 mb-7'>
      <h3 className='mb-7'>
        Entities
        (
        {getLangLabel(project.primary_language, glossary.languages)}
        )
      </h3>
      <div className={classes.entitiesWrapper}>
        {
          entities.map((entity, index) => (
            <Row key={entity.id} className='mb-5'>
              <Col>
                <p className='m-0'>{ entity.title }</p>
                {/* <span className='text-muted'>{ entity.type }</span> */}
              </Col>
              <Col>
                <div className='text-right'>
                  <button
                    className='btn btn-default text-dark font-weight-bold'
                    type='button'
                    disabled={submitting}
                    onClick={handleAddToGlossary.bind(this, entity, index)}
                  >
                    Add to Glossary
                  </button>
                </div>
              </Col>
            </Row>
          ))
        }
      </div>
    </Paper>
  );
}

Entities.defaultProps = { entitiesFromSocket: [] };

Entities.propTypes = { entitiesFromSocket: PropTypes.array };
