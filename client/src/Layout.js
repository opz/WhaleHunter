import React from 'react';
import { Divider } from 'semantic-ui-react';
import Navigation from './Navigation';
import Footer from './Footer';

export default props => {
  const { web3, accounts, children } = props;

  return (
    <>
      <Navigation
        web3={web3}
        accounts={accounts}
      >
        {children}
        <Divider hidden />
        <Footer />
      </Navigation>
    </>
  );
};
