/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";

import AlertDialogSlide from "../../layout/components/extras/Dialog";

export function DropdownMenu4() {
  return (
    <>
      {/*begin::Navigation*/}
      <ul className="navi navi-hover py-1 px-1">
        <li className="navi-item">
          <a href="#" className="navi-link">
            <span className="navi-text">Share</span>
          </a>
        </li>
        <li className="navi-item">
          <AlertDialogSlide />
        </li>
      </ul>
      {/*end::Navigation*/}
    </>
  );
}
