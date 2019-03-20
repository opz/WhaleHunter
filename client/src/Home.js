import React from 'react';
import withWeb3 from './utils/withWeb3';
import { Container } from 'semantic-ui-react';
import Layout from './Layout';
import PageHeader from './PageHeader';
import FindWhales from './FindWhales';

const onCallToAction = formRef => {
  return () => {
    formRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
};

export default withWeb3()(props => {
  const { location, web3, accounts } = props;

  const formRef = React.createRef();

  return (
    <Layout location={location} web3={web3} accounts={accounts}>
      <PageHeader
        title="WhaleHunter"
        subtitle="Find whales for any ERC-20 token"
        callToAction="START HUNTING"
        onCallToAction={onCallToAction(formRef)}
        fullscreen
      >
        <p style={{ textAlign: 'justify' }}>
          WhaleHunter searches the transaction history of an ERC-20 token to identify all current token holders and their token balance.
          The list is sorted by balance in descending order, showing the biggest whales at the top.
        </p>
      </PageHeader>
      <Container text>
        <div ref={formRef}>
          <FindWhales web3={web3} />
        </div>
      </Container>
    </Layout>
  );
});
