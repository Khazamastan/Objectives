import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import ChildObjective from './ChildObjective';

const ParentObjective = ({
  children, title, idx, collapse,
}) => {
  const [openTree, setOpenTree] = useState(true);
  const toggleOpen = () => {
    setOpenTree(!openTree);
  };

  useEffect(() => {
    if (openTree !== collapse) {
      setOpenTree(collapse);
    }
  }, [collapse]);
  const childrenClsList = `tree-child ${openTree ? 'open' : 'close'}`;
  return (
    <div className="tree-parent">
      <p className="tree-parent__label">
        <FontAwesomeIcon
          className="tree__arrow"
          onClick={toggleOpen}
          color="##a2a3a5"
          fixedWidth
          icon={openTree ? faCaretDown : faCaretRight}
        />
        <FontAwesomeIcon
          className="tree__user"
          color="#dddfe4"
          icon={faUserCircle}
        />
        <span role="link" onClick={toggleOpen}>
          <span className="tree-parent__label__number">{idx + 1}</span>
          .
          <span className="ml-5">{title}</span>
        </span>
      </p>
      <ol className={childrenClsList}>
        <div className="child-container" />
        {children.map((childObjective) => (
          <ChildObjective
            parent={title}
            key={childObjective.id}
            {...childObjective}
          />
        ))}
      </ol>
    </div>
  );
};

ParentObjective.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node,
    PropTypes.any,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  idx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  collapse: PropTypes.bool.isRequired,
};

export default ParentObjective;
