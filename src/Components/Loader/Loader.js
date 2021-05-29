import './loader.scss';
import React from 'react';
import PropTypes from 'prop-types';

function Loader({ loadingText, errorText }) {
  if (errorText) {
    return <p className="error-message">{errorText}</p>;
  }
  return (
    <div className="loader">
      <span
        aria-label="Please wait"
        className="loader__wrapper loader__indicator"
      />
      {loadingText && <span className="loader__text">{loadingText}</span>}
    </div>
  );
}

Loader.defaultProps = {
  errorText: 'error',
  loadingText: 'Loading',
};

Loader.propTypes = {
  errorText: PropTypes.string,
  loadingText: PropTypes.string,
};

export default Loader;
