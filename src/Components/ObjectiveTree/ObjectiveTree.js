import React from 'react';
import './tree.scss';
import PropTypes from 'prop-types';

import ParentObjective from './ParentObjective';

const ObjectiveTree = ({ groupedList, collapse }) => (
  <ul className="tree">
    {groupedList.map((parentObjective, idx) => (
      <ParentObjective
        key={parentObjective.id}
        collapse={collapse}
        idx={idx}
        {...parentObjective}
      />
    ))}
  </ul>
);

ObjectiveTree.defaultProps = {
  collapse: true,
};

ObjectiveTree.propTypes = {
  groupedList: PropTypes.instanceOf(Array).isRequired,
  collapse: PropTypes.bool,
};

export default ObjectiveTree;
