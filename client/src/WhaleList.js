import React, { Component } from 'react';
import { Pagination, Table } from 'semantic-ui-react';

function WhaleRow(props) {
  const { whale } = props;

  return (
    <Table.Row>
      <Table.Cell>{whale.address}</Table.Cell>
      <Table.Cell>{whale.balance.toString()}</Table.Cell>
    </Table.Row>
  );
}

class WhaleList extends Component {
  state = {
    pageSize: 10,
    activePage: 1
  };

  onPageChange = (event, { activePage }) => this.setState({ activePage });

  render() {
    const { whales } = this.props;
    const { pageSize, activePage } = this.state;

    const start = (activePage - 1) * pageSize;
    const end = activePage * pageSize;

    const whaleRows = whales.slice(start, end).map(whale => {
      const whaleObj = { address: whale[0], balance: whale[1] };
      return <WhaleRow key={whaleObj.address} whale={whaleObj} />;
    });

    const totalPages = Math.ceil(whales.length / pageSize);

    return (
      <div className="WhaleList">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {whaleRows}
          </Table.Body>
        </Table>
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

export default WhaleList;
