import React from "react";
import { TilesWidget10 } from "../widgets";
import ButtonNav from "../widgets/button-nav/ButtonNav";
export function Demo2Dashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-xl-12">
          <TilesWidget10 className="gutter-b" widgetHeight="220px" />
        </div>
      </div>
      <div className="row">
        <ButtonNav className="col-lg-12" />

        <hr className="col-lg-12" />
      </div>
    </div>
  );
}
