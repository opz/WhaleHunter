import React from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';

export default () => {
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

  return listItems;
}
