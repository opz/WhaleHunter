import React from 'react';
import Navigation from './Navigation';

export default props => {
  const { web3, children } = props;

  return (
    <>
      <Navigation
        logo={null}
        web3={web3}
      >
        {children}
      </Navigation>
    </>
  );
};
