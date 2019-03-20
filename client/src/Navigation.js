import React, { Component } from 'react';
import { Icon, Menu, Responsive, Sidebar } from 'semantic-ui-react';
import NavigationItems from './NavigationItems';
import NetworkStatus from './NetworkStatus';

import './Navigation.css';

class Navigation extends Component {
  state = {
    visible: false
  };

  onSidebarClick = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  onPusherClick = () => {
    const { visible } = this.state;

    if (visible) {
      this.setState({ visible: false });
    }
  }

  render() {
    const { location, web3, accounts, children } = this.props;
    const { visible } = this.state;

    return (
      <div className="Navigation">
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="overlay" vertical visible={visible}>
            <NetworkStatus web3={web3} accounts={accounts} />
            <NavigationItems location={location} />
          </Sidebar>
          <Sidebar.Pusher onClick={this.onPusherClick} dimmed={visible}>
            <Menu secondary fixed="top">
              <Responsive
                as={Menu.Menu}
                minWidth={Responsive.onlyTablet.minWidth}
              >
                <NetworkStatus web3={web3} accounts={accounts} />
              </Responsive>
              <Responsive
                as={Menu.Menu}
                position="right"
                minWidth={Responsive.onlyTablet.minWidth}
              >
                <NavigationItems location={location} />
              </Responsive>
              <Responsive
                {...Responsive.onlyMobile}
                as={Menu.Menu}
                position="right"
              >
                <Menu.Item onClick={this.onSidebarClick}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Responsive>
            </Menu>
            <div className="SidebarPusherChildren">
              {children}
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default Navigation;
