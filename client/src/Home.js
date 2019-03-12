import React from 'react';
import withWeb3 from './utils/withWeb3';
import { Container } from 'semantic-ui-react';
import Layout from './Layout';
import PageHeader from './PageHeader';
import FindWhales from './FindWhales';

export default withWeb3()(props => {
  const { web3 } = props;

  return (
    <Layout web3={web3}>
      <PageHeader
        title="WhaleHunter"
        subtitle="Find whales for ERC-20 tokens"
        callToAction="FIND WHALES"
        fullscreen
      />
      <Container text>
        <FindWhales web3={web3} />
      </Container>
    </Layout>
  );
});
