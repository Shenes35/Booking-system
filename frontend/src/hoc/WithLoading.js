// src/hoc/withLoading.js
import React from 'react';

const withLoading = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) return <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
