import React from 'react';
import PropTypes from 'prop-types';

const ErrorNotification = ({ text }) => <h1>No images on this page: {text}</h1>;

ErrorNotification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorNotification;
