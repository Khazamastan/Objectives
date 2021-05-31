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
  children, title, collapse,
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
      <div className="tree-parent__label">
        <div className="tree-parent__actions">
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
        </div>
        <li role="link" onClick={toggleOpen}>
          <span>{title}</span>
        </li>
      </div>
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
  collapse: PropTypes.bool.isRequired,
};

export default ParentObjective;
