import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default props => {
  const { web3, children } = props;

  return (
    <>
      <Navigation
        web3={web3}
      >
        {children}
        <Footer />
      </Navigation>
    </>
  );
};
