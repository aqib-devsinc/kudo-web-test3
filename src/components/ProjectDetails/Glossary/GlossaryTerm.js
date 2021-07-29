import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TableRow, TableCell, Checkbox, Paper, Collapse, Tooltip } from '@material-ui/core';
import SVG from 'react-inlinesvg';
import { useParams, useRouteMatch } from 'react-router-dom';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useStyles } from 'styles/projectDetails';
import { updateTermRequest, addTermRequest } from 'redux/actions/projects';
import urls from 'constants/urls';
import { GLOSSARY_TRANSLATION_ATTRS } from 'constants/projectDetails';
import TerminologyDetailAttribute from './TerminologyDetailAttribute';
import GlossaryTermTD from './GlossaryTermTD';

function GlossaryTerm({
  id,
  isEditing,
  comment,
  definition,
  favorite,
  feedback,
  speaker,
  status,
  creator,
  editor,
  translations,
  languageCols,
  allChecked,
  onCheckChange,
  created_at,
  updated_at,
  cycle_id,
  showCheckbox,
  tableLanguages,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [checked, setChecked] = useState(allChecked);
  const [focusedField, setFocusedField] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const detachedRouteMatched = useRouteMatch(urls.detachedProjectGlossary);

  useEffect(() => setChecked(allChecked), [allChecked]);

  useEffect(() => {
    if (!isExpanded) return;

    if (!definition) setFocusedField('definition');
    else if (!feedback) setFocusedField('feedback');
    else if (!comment) setFocusedField('comment');
    else if (!speaker) setFocusedField('speaker');
    else if (!favorite) setFocusedField('favorite');

    else setFocusedField('');
  }, [definition, favorite, comment, speaker, favorite, isExpanded]);

  const toggleExpansion = useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  const onTermDetailAttrChange = useCallback((attrName, value) => {
    if (!id) {
      return dispatch(addTermRequest({
        projectId,
        data: { terms: [{ [attrName]: value }] },
      }));
    }

    dispatch(updateTermRequest({
      projectId,
      data: {
        id,
        [attrName]: value,
      },
    }));
  }, [id]);

  const handleCheckChange = useCallback(() => {
    if (id) {
      onCheckChange({
        termId: id,
        checked: !checked,
      });
    }

    setChecked(!checked);
  }, [id, checked]);

  const renderLangTranlation = (lang) => {
    const translation = translations.find((trans) => trans.language === lang);

    return (
      <Fragment key={lang}>
        {
          languageCols[lang]?.cols.filter((col) => col.checked === true).length ? (
            languageCols[lang].cols
              .filter((col) => col.checked === true)
              .map((col, index, { length }) => (
                col.checked ? (
                  <GlossaryTermTD
                    key={`${lang}-${col.value}`}
                    text={translation?.[col.value]}
                    showWikiTooltip={col.value === GLOSSARY_TRANSLATION_ATTRS.term.value}
                    canEdit={isEditing}
                    className={`term-trans-attr-col ${(index === length - 1) ? classes.cellBorder : null}`}
                    term={{
                      id,
                      lang,
                      translationId: translation?.id,
                      attr: col.value,
                    }}
                  />
                ) : null
              ))
          ) : (
            null
          )
        }
      </Fragment>
    );
  };

  return (
    <>
      <TableRow className={`${classes.row} ${isExpanded ? classes.expandedRow : ''}`}>
        {
          (!detachedRouteMatched && !isEmpty(tableLanguages)) && (
            <>
              <TableCell className={classes.newTermTd}>
                <div className='d-flex align-items-center'>
                  {
                    created_at && moment().diff(created_at, 'h') < 24 && (
                      <Tooltip title='Newly added term' placement='right-end'>
                        <span className={classes.newTermIndicator} />
                      </Tooltip>
                    )
                  }
                </div>
              </TableCell>
              <TableCell className={`${classes.cellBorder} ${classes.termTd}`}>
                {
                  id ? (
                    <div className='d-flex align-items-center'>
                      {
                        (isEditing && showCheckbox) && <Checkbox checked={checked} onChange={handleCheckChange} />
                      }
                      {
                        isExpanded ? (
                          <SVG
                            src='/media/svg/icons/Navigation/Red-Minus.svg'
                            className='pointer'
                            onClick={toggleExpansion}
                          />
                        ) : (
                          <SVG
                            src='/media/svg/icons/Navigation/Green-Plus.svg'
                            className='pointer'
                            onClick={toggleExpansion}
                          />
                        )
                      }
                    </div>
                  ) : <></>
                }
              </TableCell>
            </>
          )
        }
        {
          Object.values(languageCols).map((lang) => renderLangTranlation(lang.value))
        }
      </TableRow>
      {
        !detachedRouteMatched && (
          <TableCell colSpan={Object.values(languageCols).length * 6} className='p-0 h-0'>
            <Collapse in={isExpanded}>
              <Paper className='pt-4 pb-8'>
                <div className={classes.termDescriptionWrapper}>
                  <TerminologyDetailAttribute
                    label='Definition'
                    value={definition}
                    creator={creator}
                    editor={editor}
                    created_at={created_at}
                    updated_at={updated_at}
                    isEditing={isEditing}
                    onChange={onTermDetailAttrChange.bind(this, 'definition')}
                    cycle_id={cycle_id}
                    definition
                    focused={focusedField === 'definition'}
                  />
                  <TerminologyDetailAttribute
                    label='Client feedback'
                    value={feedback}
                    isEditing={isEditing}
                    onChange={onTermDetailAttrChange.bind(this, 'feedback')}
                    focused={focusedField === 'feedback'}
                  />
                  <TerminologyDetailAttribute
                    label='Comment'
                    value={comment}
                    isEditing={isEditing}
                    onChange={onTermDetailAttrChange.bind(this, 'comment')}
                    focused={focusedField === 'comment'}
                  />
                  <TerminologyDetailAttribute
                    label='Status'
                    value={status}
                    isEditing={false}
                    status
                  />
                  <TerminologyDetailAttribute
                    label='Speaker'
                    value={speaker}
                    isEditing={isEditing}
                    onChange={onTermDetailAttrChange.bind(this, 'speaker')}
                    focused={focusedField === 'speaker'}
                  />
                  <TerminologyDetailAttribute
                    label='Favorite'
                    value={favorite}
                    isEditing={isEditing}
                    onChange={onTermDetailAttrChange.bind(this, 'favorite')}
                    focused={focusedField === 'favorite'}
                  />
                </div>
              </Paper>
            </Collapse>
          </TableCell>
        )
      }
    </>
  );
}

GlossaryTerm.defaultProps = {
  id: null,
  comment: null,
  definition: null,
  favorite: null,
  feedback: null,
  speaker: null,
  editor: null,
  translations: PropTypes.arrayOf(PropTypes.objectOf({
    name: null,
    abbreviation: null,
    pos: null,
    example: null,
    source: null,
  })),
  created_at: null,
  cycle_id: null,
  creator: null,
  updated_at: null,
};

GlossaryTerm.propTypes = {
  id: PropTypes.number,
  isEditing: PropTypes.bool.isRequired,
  comment: PropTypes.string,
  definition: PropTypes.string,
  favorite: PropTypes.string,
  feedback: PropTypes.string,
  speaker: PropTypes.string,
  status: PropTypes.string.isRequired,
  editor: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
  }),
  creator: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
  }),
  translations: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    abbreviation: PropTypes.string,
    pos: PropTypes.string,
    example: PropTypes.string,
    source: PropTypes.string,
    language: PropTypes.string.isRequired,
    term: PropTypes.number.isRequired,
  })),
  languageCols: PropTypes.object.isRequired,
  allChecked: PropTypes.bool.isRequired,
  onCheckChange: PropTypes.func.isRequired,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  cycle_id: PropTypes.number,
  showCheckbox: PropTypes.bool.isRequired,
  tableLanguages: PropTypes.object.isRequired,
};

export default memo(GlossaryTerm);
