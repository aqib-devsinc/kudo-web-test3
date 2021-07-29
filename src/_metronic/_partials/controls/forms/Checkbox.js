import React from "react";

export function Checkbox({ isSelected, onChange, children }) {
  return (
    <>
      <input type="checkbox" style={{display: "none"}} />
      <label className="checkbox checkbox-md checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        {children}
      </label>
    </>
  );
}
