import React from 'react';
import withWeb3 from './utils/withWeb3';
import Layout from './Layout';
import PageHeader from './PageHeader';

export default withWeb3()(props => {
  const { web3 } = props;

  return (
    <Layout web3={web3}>
      <PageHeader
        title="WhaleFinder"
        subtitle="Find whales for ERC-20 tokens"
        callToAction="Find Whales"
        fullscreen
      />
    </Layout>
  );
});
