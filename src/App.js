import './styles.scss';
import React from 'react';

import Home from './Containers/Home';
import ErrorBoundary from './Containers/ErrorBoundary';

export default function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </div>
  );
}
