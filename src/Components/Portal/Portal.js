import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Portal({ children, parent }) {
  const el = React.useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    if (target) {
      target.appendChild(el);
    }
    return () => {
      if (target) {
        target.removeChild(el);
      }
    };
  }, [el, parent]);
  return ReactDOM.createPortal(children, el);
}

Portal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  parent: PropTypes.node.isRequired,
};

export default Portal;
