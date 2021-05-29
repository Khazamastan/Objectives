import './dropdown.scss';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ options = [], onChange, placeholder }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (selectedId) => {
    setSelectedItem(selectedId);
    onChange(selectedId);
    setOpen(false);
  };
  const node = useRef();

  const allOptions = [{ id: '', label: 'Select All' }, ...options];
  let selectedLabel = placeholder || 'Select Option';
  const selectedOption = allOptions.find((item) => item.id === selectedItem);
  if (selectedOption) {
    selectedLabel = selectedOption.label;
  }

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div ref={node} className={`dropdown ${isOpen && 'open'}`}>
      <div className="dropdown__header" onClick={toggleDropdown}>
        {selectedLabel}
        <FontAwesomeIcon
          color="#91A5BE"
          icon={isOpen ? faChevronDown : faChevronRight}
        />
      </div>
      <div className={`dropdown__body ${isOpen && 'open'}`}>
        {allOptions.map(({ id, label }) => (
          <div
            key={id}
            className="dropdown__item"
            onClick={(e) => handleItemClick(e.target.id)}
            id={id}
          >
            <span
              className={`dropdown__item__dot ${
                id === selectedItem && 'selected'
              }`}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Dropdown;
