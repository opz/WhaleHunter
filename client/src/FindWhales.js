import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import findWhales from './utils/findWhales';
import WhaleList from './WhaleList';

class FindWhales extends Component {
  state = {
    token: '',
    decimals: '',
    whales: [],
    loading: false,
    errorMessage: ''
  };

  onChange = (event, { name, value }) => this.setState({ [name]: value });

  onSubmit = async () => {
    const { web3 } = this.props;
    const { token } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const whales = await findWhales(web3, token);

      this.setState({ whales });
    } catch(error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });

  };

  render() {
    const { token, decimals, whales, loading, errorMessage } = this.state;

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
          <Form.Button>Find Whales</Form.Button>
        </Form>
        <WhaleList whales={whales} />
      </>
    );
  }
}

export default FindWhales;
