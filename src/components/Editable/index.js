import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function Editable({ text, canEdit, onDone, focused }) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => setValue(text), [text]);

  useEffect(() => {
    if (canEdit) setEditing(true);
  }, [canEdit]);

  useEffect(() => {
    if (text && canEdit) setEditing(false);
  }, [text, canEdit]);

  useEffect(() => {
    if (focused && inputRef.current) inputRef.current.focus();
  })

  const handleKeyDown = (event) => {
    const { key, target } = event;
    const keys = ['Escape', 'Enter'];

    if (keys.includes(key)) {
      if (keys.indexOf(key) === 1) onDone?.(target.value);

      setValue(text);
      setEditing(false);
    }
  };

  const handleValueChange = ({ target: { value: newValue } }) => {
    setValue(newValue);
  };

  const handleOnBlur = () => {
    if (text) setEditing(false);
    setValue(text);
  };

  return isEditing ? (
    <div
      onBlur={handleOnBlur}
      onKeyDown={handleKeyDown}
      role='presentation'
    >
      <input type='text' ref={inputRef} value={value} onChange={handleValueChange} />
    </div>
  ) : (
    <div
      onClick={() => canEdit && setEditing(true)}
      role='presentation'
      className='d-inline-block'
    >
      { text || '-' }
    </div>
  );
}

Editable.defaultProps = {
  text: null,
  canEdit: true,
  onDone: null,
};

Editable.propTypes = {
  text: PropTypes.string,
  canEdit: PropTypes.bool,
  onDone: PropTypes.func,
  focused: PropTypes.bool.isRequired,
};
