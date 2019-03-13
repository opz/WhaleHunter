import React, { Component } from 'react';
import { Confirm, Divider, Form, Message } from 'semantic-ui-react';
import findWhales from './utils/findWhales';
import WhaleList from './WhaleList';

import './FindWhales.css';

class FindWhales extends Component {
  state = {
    token: '',
    decimals: '',
    whales: [],
    loading: false,
    errorMessage: '',
    modalOpen: false
  };

  onChange = (event, { name, value }) => this.setState({ [name]: value });

  onSubmit = () => {
    this.setState({ modalOpen: true });
  };

  onConfirm = async () => {
    const { web3 } = this.props;
    const { token } = this.state;

    this.setState({ loading: true, errorMessage: '', modalOpen: false });

    try {
      const whales = await findWhales(web3, token);

      this.setState({ whales });
    } catch(error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const {
      token,
      decimals,
      whales,
      loading,
      errorMessage,
      modalOpen
    } = this.state;

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
          <Message error title="Error" content={errorMessage} />
          <Form.Button primary circular>SEARCH FOR WHALES</Form.Button>
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
