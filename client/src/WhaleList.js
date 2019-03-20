import React, { Component } from 'react';
import { Button, Pagination, Table } from 'semantic-ui-react';
import ReactExport from 'react-data-export';

import './WhaleList.css';

function WhaleRow(props) {
  const { whale } = props;

  return (
    <Table.Row>
      <Table.Cell>{whale.address}</Table.Cell>
      <Table.Cell textAlign="right">{whale.balance}</Table.Cell>
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
    const { token, whales } = this.props;
    const { pageSize, activePage } = this.state;

    const ExcelFile = ReactExport.ExcelFile;

    const start = (activePage - 1) * pageSize;
    const end = activePage * pageSize;

    const whaleRows = whales.slice(start, end).map(whale => {
      const whaleObj = { address: whale[0], balance: whale[1] };
      return <WhaleRow key={whaleObj.address} whale={whaleObj} />;
    });

    const totalPages = Math.ceil(whales.length / pageSize);

    if (whales && whales.length > 0) {
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
            borderless
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={this.onPageChange}
          />
          <ExcelFile filename={`${token}_whales`} element={
              <Button
                circular
                floated="right"
                content="DOWNLOAD"
                icon="download"
                labelPosition="right"
              />
            }
          >
            <ExcelFile.ExcelSheet data={whales} name="Whales">
              <ExcelFile.ExcelColumn label="Address" value={0} />
              <ExcelFile.ExcelColumn label="Balance" value={1} />
            </ExcelFile.ExcelSheet>
          </ExcelFile>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default WhaleList;
