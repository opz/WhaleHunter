import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export default props => {
  const { web3, accounts } = props;

  const hasMetaMask = window.ethereum || window.web3;
  const hasAccounts = accounts && accounts.length > 0;
  const usingDefaultProvider = !hasAccounts && !hasMetaMask;
  const metaMaskConnected = hasAccounts && hasMetaMask;

  if (web3 && (usingDefaultProvider || metaMaskConnected)) {
    return (
      <Menu.Item>
        <Icon name="check circle" color="green" /> Network Connected
      </Menu.Item>
    );
  } else {
    return (
      <Menu.Item>
        <Icon name="warning circle" color="red" /> MetaMask Not Installed
      </Menu.Item>
    );
  }
}
