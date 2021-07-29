import React from "react";
import { useStyles } from 'styles/auth';

export function FooterCompact({
  today,
  footerClasses,
  footerContainerClasses,
}) {
  const classes = useStyles();
  return (
    <footer className='page-footer font-small blue mt-10'>
        <div className={`footer-copyright d-flex align-items-center justify-content-center py-3 ${classes.silentText}`}>
          <span className='text-muted'>
            <span>&#169; </span>
            KUDO, Inc,
            {today}
            . All rights reserved. v
            &nbsp;
            { process.env.REACT_APP_VERSION }
          </span>
        </div>
    </footer>
  );
}
