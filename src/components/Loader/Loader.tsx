import React from 'react';

import './Loader.scss'
import { ELEMENT_TEST_IDS } from '../../constants'

const Loader: React.FC = () => {
  return (
    <div className="Loader" data-testid={ELEMENT_TEST_IDS.LOADING}>
      <div className="Loader__container">
      </div>
    </div>
  )
}

export default Loader;
