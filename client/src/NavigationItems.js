import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';

export default props => {
  const { location } = props;
  let listItems = [
    (
      <Menu.Item key="terms" as={NavLink} to="/terms">
        Terms and Conditions
      </Menu.Item>
    ), (
      <Menu.Item key="privacy" as={NavLink} to="/privacy">
        Privacy Policy
      </Menu.Item>
    )
  ];

  if (location.pathname !== '/') {
    listItems.push(
      <Menu.Item key="home" as={NavLink} exact to="/">
        <Button primary circular>
          START HUNTING
        </Button>
      </Menu.Item>
    );
  }

  return listItems;
}
