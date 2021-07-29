import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../layout";
import { Demo2Dashboard } from "./Demo2Dashboard";
import { ToastContainer } from "react-toastify";
export function Dashboard() {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      demo: objectPath.get(uiService.config, "demo"),
    };
  }, [uiService]);
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {layoutProps.demo === "demo2" && <Demo2Dashboard />}
    </div>
  );
}
