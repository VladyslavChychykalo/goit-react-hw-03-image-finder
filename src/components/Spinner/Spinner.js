import React from 'react';
import Loader from 'react-loader-spinner';
import { spinner } from './Spinner.module.css';

const Spinner = () => (
  <div className={spinner}>
    <Loader
      type="Puff"
      color="#00BFFF"
      height={200}
      width={200}
      timeout={3000}
    />
  </div>
);

export default Spinner;
