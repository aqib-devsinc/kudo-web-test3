import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateTermRequest, addTermRequest } from 'redux/actions/projects';
import {
  TableCell,
  Tooltip,
  Card,
  CardHeader,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  withStyles,
  ClickAwayListener,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SVG from 'react-inlinesvg';
import { WIKIMEDIA_LANGS, KEY_TYPES } from 'constants/projectDetails';

function GlossaryTermTD({
  text,
  showWikiTooltip,
  className,
  canEdit,
  term,
}) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    if (isEditing) setEditing(false);
  }, [canEdit]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => setValue(text), [text]);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipImageUrl, setTooltipImageUrl] = useState('');

  const handleClose = (event) => {
    event.stopPropagation();
    setIsTooltipOpen(false);
  };

  const handleTranslationAttrChange = useCallback((newValue) => {
    if (!term.id) {
      return dispatch(addTermRequest({
        projectId,
        data: {
          terms: [{
            translations: [{
              language: term.lang,
              [term.attr]: newValue,
            }],
          }],
        },
      }));
    }

    dispatch(updateTermRequest({
      projectId,
      data: {
        id: term.id,
        translation: {
          id: term.translationId || null,
          language: term.lang,
          [term.attr]: newValue,
        },
      },
    }));
  }, [term?.id]);

  const handleKeyDown = (event) => {
    const { key, target } = event;

    if (Object.values(KEY_TYPES).includes(key)) {
      if (key === KEY_TYPES.enter || key === KEY_TYPES.tab) handleTranslationAttrChange(target.value);

      setValue(text);
      setEditing(false);
    }
  };

  const handleValueChange = ({ target: { value: newValue } }) => {
    setValue(newValue);
  };

  const handleOnBlur = (event) => {
    const { key } = event;

    setEditing(false);

    if (key === 'Escape') return;

    setValue(text);
  };

  const handleEnableEditing = () => {
    if (canEdit) setEditing(true);
  };

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  const handleTooltipToggle = (event) => {
    event.stopPropagation();

    if (!isTooltipOpen) {
      setIsTooltipOpen(true);

      // eslint-disable-next-line max-len
      fetch(`https://${WIKIMEDIA_LANGS[term.lang].value}.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${value}&prop=pageimages&piprop=original&titles=${value}`)
        .then((res) => {
          if (!res.ok) throw res;

          return res.json();
        })
        .then((jsonRes) => {
          setTooltipImageUrl(Object.values(jsonRes.query?.pages)?.[0]?.original?.source);
          setTooltipText(jsonRes.query?.search?.[0]?.snippet ?? 'No data found');
          setIsTooltipOpen(true);
        })
        .catch((err) => console.log(err));
    }

    if (isTooltipOpen) setIsTooltipOpen(false);
  }

  const handleTooltipFocus = (event) => {
    event.stopPropagation();
  }

  return isEditing ? (
    <TableCell
      className={className}
      onBlur={handleOnBlur}
      onKeyDown={handleKeyDown}
    >
      <input type='text' ref={inputRef} value={value} onChange={handleValueChange} />
    </TableCell>
  ) : (
    <TableCell
      className={className}
      onClick={handleEnableEditing}
      onFocus={handleEnableEditing}
      tabIndex={0}
    >
      { text }
      {
        (showWikiTooltip && !!text) && (
          <ClickAwayListener onClickAway={handleClose}>
            <LightTooltip
              open={isTooltipOpen}
              onClose={handleClose}
              disableFocusListener
              disableTouchListener
              disableHoverListener
              PopperProps={{ disablePortal: true }}
              interactive
              title={(
                <Card>
                  <button type='button' className='btn p-0 pr-2 pb-1 float-right' onClick={handleClose}>
                    <SVG src='/media/svg/icons/General/cancel.svg' height={15} width={15} />
                  </button>
                  <CardActionArea>
                    {
                      !!tooltipImageUrl && (
                        <CardMedia
                          style={{
                            height: 0, paddingTop: '56.25%',
                          }}
                          image={tooltipImageUrl}
                        />
                      )
                    }
                  </CardActionArea>
                  <CardContent className='p-0 px-1'>
                    <Typography>
                      <div dangerouslySetInnerHTML={{ __html: tooltipText }} />
                    </Typography>
                  </CardContent>
                </Card>
              )}
              placement='right-end'
              arrow
            >
              <span>
                <button
                  type='button'
                  className='btn p-0 pl-1'
                  tabIndex={-1}
                  onFocus={handleTooltipFocus}
                  onClick={handleTooltipToggle}
                >
                  <SVG src='/media/svg/icons/General/wiki-info-circle.svg' height={15} width={15} />
                </button>
              </span>
            </LightTooltip>
          </ClickAwayListener>
        )
      }
    </TableCell>
  );
}

GlossaryTermTD.propTypes = {
  text: PropTypes.oneOf([PropTypes.string, null]).isRequired,
  showWikiTooltip: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
  term: PropTypes.object.isRequired,
}

export default memo(GlossaryTermTD);
