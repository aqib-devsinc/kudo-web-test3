import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Collapse } from '@material-ui/core';
import { AddCircleOutlined } from '@material-ui/icons';
import SVG from 'react-inlinesvg';
import { useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import { showToast } from 'redux/actions/toast';
import { GLOSSARY_TRANSLATION_ATTRS } from 'constants/projectDetails';
import { useStyles } from 'styles/projectDetails';
import { addTerm } from 'api/projects';
import { setProjectGlossaryTerms, setProjectGlossaryStats } from 'redux/actions/projects';
import usePrevious from 'custom-hooks/usePrevious';
import AddTerm from './AddTerm';

export default function TermExtractor() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [terms, setTerms] = useState(new Array(1).fill({
    value: '',
    language: '',
  }));
  const glossary = useSelector(({ projects }) => projects.glossary);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { projectId } = useParams();

  const previousLanguages = usePrevious(glossary.languages);
  const destinationCol = GLOSSARY_TRANSLATION_ATTRS.term.value;

  useEffect(() => {
    if (!glossary.languages?.length || isEqual(previousLanguages, glossary.languages)) return;

    setTerms(new Array(glossary.languages.length).fill({
      value: '',
      language: '',
    }));
  }, [glossary.languages]);

  const toggleCollapse = useCallback(() => setIsExpanded(!isExpanded));

  const handleCreateExtractedTerms = useCallback(() => {
    const data = terms.filter((term) => !!term.value);

    if (!data.length) return;

    addTerm(projectId, {
      terms: data.map(({ value, language }) => ({
        translations: [{
          [destinationCol]: value,
          language,
        }],
      })),
    }).then((response) => {
      if (response.error) throw response;

      dispatch(showToast({
        type: 'success',
        message: 'Successfully created terms',
      }));
      setTerms(terms.map((term) => ({
        ...term,
        value: '',
      })));

      dispatch(setProjectGlossaryStats({
        statistics: {
          ...glossary.statistics,
          number_of_terms: glossary.statistics.number_of_terms + data.length,
        },
      }))

      dispatch(setProjectGlossaryTerms({
        terms: [
          ...response.terms,
          ...glossary.terms.splice(response.terms.length - glossary.terms),
        ],
      }));
    }).catch((err) => dispatch(showToast({
      type: 'error',
      message: err.data.message ?? 'Failed to create extracted terms',
    })));
  });

  const handleAddTerm = useCallback(() => setTerms([...terms, {
    value: '',
    language: '',
  }]));

  const handleUpdateTerm = useCallback((index, key, value) => {
    const copiedTerms = [...terms];
    copiedTerms[index] = {
      ...copiedTerms[index],
      [key]: value,
    };

    setTerms(copiedTerms);
  });

  return (
    <Paper className='p-4'>
      <div className='d-flex align-items-center'>
        <div>
          <h3>Manual Term Extractor</h3>
        </div>
        <div className='ml-auto'>
          {
            !isExpanded ? (
              <div className='d-flex justify-content-end'>
                <button
                  className='btn btn-primary font-weight-bold px-7 btn-toggle'
                  type='button'
                  onClick={toggleCollapse}
                >
                  Expand
                </button>
              </div>
            ) : (
              <div className='d-flex align-items-center justify-content-between'>
                <button
                  className='btn btn-primary font-weight-bold mr-2 py-2'
                  type='button'
                  onClick={handleCreateExtractedTerms}
                >
                  <SVG src='/media/svg/icons/Navigation/Arrow-to-up.svg' className='mr-2' />
                  Move selected to glossary
                </button>
                <button
                  className='btn btn-default text-dark font-weight-bold btn-toggle'
                  type='button'
                  onClick={toggleCollapse}
                >
                  Collapse
                </button>
              </div>
            )
          }
        </div>
      </div>
      <Collapse in={isExpanded}>
        <p className='text-muted'>
          The selected text will be moved to
          <br />
          the matching language in the glossary
        </p>
        <div className={classes.termExtractorWrapper}>
          {
            terms.map((term, index) => (
              <div key={index} className='extractor-card mb-4 mr-7'>
                <AddTerm
                  term={term.value}
                  language={term.language}
                  onUpdateTerm={handleUpdateTerm.bind(this, index)}
                />
              </div>
            ))
          }
          <div
            className={`
              d-flex justify-content-center align-items-center mt-15 mb-15
              p-2 pointer add-term ${classes.dashedBorder}
            `}
            role='presentation'
            onClick={handleAddTerm}
          >
            <AddCircleOutlined />
          </div>
        </div>
      </Collapse>
    </Paper>
  );
}
