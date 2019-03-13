import React, { Component } from 'react';
import {
  Confirm,
  Divider,
  Form,
  Message
} from 'semantic-ui-react';
import findWhales from './utils/findWhales';
import WhaleList from './WhaleList';

import './FindWhales.css';

class FindWhales extends Component {
  state = {
    token: '',
    decimals: '',
    blockBatchSize: '50000',
    concurrentBatches: '100',
    addressBatchSize: '100',
    whales: [],
    loading: false,
    errorMessage: '',
    advancedVisible: false,
    modalOpen: false
  };

  onChange = (event, { name, value }) => this.setState({ [name]: value });

  onSubmit = () => {
    this.setState({ modalOpen: true });
  };

  onConfirm = async () => {
    const { web3 } = this.props;
    const {
      token,
      blockBatchSize,
      concurrentBatches,
      addressBatchSize
    } = this.state;

    this.setState({ loading: true, errorMessage: '', modalOpen: false });

    try {
      const whales = await findWhales(
        web3,
        token,
        blockBatchSize,
        concurrentBatches,
        addressBatchSize
      );

      this.setState({ whales });
    } catch(error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  onShowAdvancedClick = event => {
    event.preventDefault();
    const { advancedVisible } = this.state;
    this.setState({ advancedVisible: !advancedVisible });
  };

  render() {
    const {
      token,
      decimals,
      blockBatchSize,
      concurrentBatches,
      addressBatchSize,
      whales,
      loading,
      errorMessage,
      advancedVisible,
      modalOpen
    } = this.state;

    const advancedClassName = `AdvancedForm fade down
      ${advancedVisible ? '' : ' hidden'}`;

    return (
      <>
        <Form
          loading={loading}
          error={!!errorMessage}
          onSubmit={this.onSubmit}
        >
          <Form.Group>
            <Form.Input
              label="Token Address"
              name="token"
              value={token}
              onChange={this.onChange}
              width={12}
              required
            />
            <Form.Input
              label="Token Decimals (optional)"
              name="decimals"
              value={decimals}
              onChange={this.onChange}
              width={4}
            />
          </Form.Group>
          <Form.Group
            widths="equal"
            className={advancedClassName}
          >
            <Form.Input
              label="Blocks Per Batch"
              name="blockBatchSize"
              value={blockBatchSize}
              onChange={this.onChange}
              required
            />
            <Form.Input
              label="Concurrent Batches"
              name="concurrentBatches"
              value={concurrentBatches}
              onChange={this.onChange}
              required
            />
            <Form.Input
              label="Addresses Per Batch"
              name="addressBatchSize"
              value={addressBatchSize}
              onChange={this.onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Button primary circular>SEARCH FOR WHALES</Form.Button>
            <Form.Button
              circular
              basic
              primary
              onClick={this.onShowAdvancedClick}
            >
              {advancedVisible ? 'Hide' : 'Show'} Advanced Options
            </Form.Button>
          </Form.Group>
          <Message error title="Error" content={errorMessage} />
        </Form>
        <Confirm
          className="FindWhalesModal"
          size="tiny"
          open={modalOpen}
          header="Search can take several minutes to complete"
          content="Do not navigate away from the page while the search is in progress."
          onCancel={() => this.setState({ modalOpen: false })}
          onConfirm={this.onConfirm}
        />
        <Divider section hidden />
        <WhaleList whales={whales} />
      </>
    );
  }
}

export default FindWhales;
