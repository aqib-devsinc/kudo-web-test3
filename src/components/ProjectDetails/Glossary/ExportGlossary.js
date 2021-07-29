import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import IconBox from 'components/IconBox';
import { showToast } from 'redux/actions/toast';
import { DOWNLOAD_GLOSSARY_OPTS } from 'constants/projectDetails';
import { useStyles } from 'styles/projectDetails';
import { exportGlossary } from 'api/projects';

function ExportGlossary({ searchTerm, orderBy, order, orderByLang, searchFilter, languageCols, mergedProjects }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const handleDownloadGlossary = (fileType) => {
    let queryParams = `type=${fileType}`;

    if (mergedProjects.length) {
      queryParams += `&${mergedProjects
        .map(((mergedProject) => `id[]=${mergedProject.id}`))
        .join('&')}`;
    }

    if (searchTerm) {
      if (searchFilter.lang) {
        queryParams += `&search_string=${searchTerm}&lang=${searchFilter.lang}&col=${searchFilter.col}`;
      } else if (searchFilter.col) {
        queryParams += `&search_string=${searchTerm}&col=${searchFilter.col}`;
      } else {
        queryParams += `&search_string=${searchTerm}`;
      }
    }

    if (orderBy) queryParams += `&order_by=${orderBy}&sort=${order}&order_by_lang=${orderByLang}`;

    Object.values(languageCols).map((lang) => {
      lang.cols.map((col) => {
        if (!col.checked) queryParams += `&exclude[][${lang.value}]=${col.value}`;
      });
    });

    exportGlossary(projectId, queryParams)
      .then((response) => {
        if (response.error) throw response;

        let url;

        if ([DOWNLOAD_GLOSSARY_OPTS.pdf.value, DOWNLOAD_GLOSSARY_OPTS.excel.value].includes(fileType)) {
          const binaryString = window.atob(response);
          const binaryLen = binaryString.length;
          const bytes = new Uint8Array(binaryLen);

          for (let i = 0; i < binaryLen; i += 1) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          url = window.URL.createObjectURL(new Blob([bytes]));
        } else {
          url = window.URL.createObjectURL(new Blob([response]));
        }

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `glossary${DOWNLOAD_GLOSSARY_OPTS[fileType].extension}`,
        );

        document.body.appendChild(link);

        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(() => dispatch(showToast({
        type: 'error',
        message: 'Failed to download glossary',
      })))
  };

  return (
    <>
      <Tooltip title='Export glossary' arrow>
        <span>
          <IconBox variant='dark' className='mr-4' onClick={(e) => setAnchorEl(e.currentTarget)}>
            <SVG src='/media/svg/icons/General/Export.svg' />
          </IconBox>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        className={classes.searchDropdownMenu}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
      >
        {
          Object.values(DOWNLOAD_GLOSSARY_OPTS).map((fileType) => (
            <MenuItem key={fileType.value} onClick={handleDownloadGlossary.bind(this, fileType.value)}>
              { fileType.label }
            </MenuItem>
          ))
        }
      </Menu>
    </>
  );
}

ExportGlossary.defaultProps = {
  searchTerm: '',
  orderBy: '',
  order: '',
  orderByLang: '',
  mergedProjects: [],
};

ExportGlossary.propTypes = {
  searchTerm: PropTypes.string,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  orderByLang: PropTypes.string,
  searchFilter: PropTypes.objectOf({
    lang: PropTypes.string.isRequired,
    col: PropTypes.string.isRequired,
  }).isRequired,
  languageCols: PropTypes.object.isRequired,
  mergedProjects: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default memo(ExportGlossary);
