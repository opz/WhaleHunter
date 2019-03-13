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
  const { web3 } = props;

  const formRef = React.createRef();

  return (
    <Layout web3={web3}>
      <PageHeader
        title="WhaleHunter"
        subtitle="Find whales for ERC-20 tokens"
        callToAction="HUNT FOR WHALES"
        onCallToAction={onCallToAction(formRef)}
        fullscreen
      />
      <Container text>
        <div ref={formRef}>
          <FindWhales web3={web3} />
        </div>
      </Container>
    </Layout>
  );
});
