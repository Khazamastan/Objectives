import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Modal from '../Modal';

const ChildObjective = ({
  title,
  parent,
  id,
  metric_name: metricName,
  metric_target: metricTarget,
  archived,
  metric_start: metrciStart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="child-container">
      <div className="child-container__content">
        <FontAwesomeIcon
          className="tree__user mr-30"
          color="#dddfe4"
          icon={faUserCircle}
        />
        <li>
          <span
            className="child-container__label"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {title}
          </span>
        </li>
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <strong>Parent</strong>
        <p>{parent}</p>
        <br />
        <br />

        <h4>Children Details</h4>
        <br />
        <br />
        <strong>Name</strong>
        <p>{title}</p>
        <strong>ID</strong>
        <p>{id}</p>
        <strong>Metric Name</strong>
        <p>{metricName}</p>
        <strong>Metric Start</strong>
        <p>{metrciStart}</p>
        <strong>Metric Target</strong>
        <p>{metricTarget}</p>
        <strong>Archived</strong>
        <p>{String(!!archived)}</p>
      </Modal>
    </div>
  );
};

ChildObjective.defaultProps = {
  metric_name: '',
  metric_target: '',
  archived: '',
  metric_start: '',
};

ChildObjective.propTypes = {
  title: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  metric_name: PropTypes.string,
  metric_target: PropTypes.string,
  archived: PropTypes.string,
  metric_start: PropTypes.string,
};

export default ChildObjective;
