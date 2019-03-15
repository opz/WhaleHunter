import React, { Component } from 'react';
import {
  Confirm,
  Divider,
  Form,
  Header,
  List,
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

    const advancedInstructionsClassName = `AdvancedFormInstructions fade down
      ${advancedVisible ? '' : ' hidden'}`;

    return (
      <div className="FindWhales">
        <Form
          loading={loading}
          error={!!errorMessage}
          onSubmit={this.onSubmit}
        >
          <Header as="h4">Instructions</Header>
          <List bulleted size="small">
            <List.Item>Enter the ERC-20 token address that you want to search.</List.Item>
            <List.Item>Set the token decimals if you want account balances displayed in TKNs instead of TKNbits.</List.Item>
            <List.Item>Start the search, it can take several minutes to complete, so do not navigate away from the page.</List.Item>
            <List.Item>When the search is complete, click the download button to save your results to a spreadsheet.</List.Item>
          </List>
          <Divider hidden />
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
          <div className={advancedInstructionsClassName}>
            <Divider hidden />
            <Header as="h4">Advanced Options</Header>
            <List bulleted size="small">
              <List.Item>Raising these values will speed up the search, but could cause errors.</List.Item>
              <List.Item>Lowering these values will reduce errors, but make the search more reliable.</List.Item>
            </List>
            <Divider hidden />
          </div>
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
            <Form.Button primary circular className="FindWhalesButton">
              SEARCH FOR WHALES
            </Form.Button>
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
      </div>
    );
  }
}

export default FindWhales;
