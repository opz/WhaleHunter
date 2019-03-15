import React from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image
} from 'semantic-ui-react';
import classNames from 'classnames';

import './PageHeader.css';

import orca from './orca.png';

export default props => {
  const {
    children,
    title,
    subtitle,
    callToAction,
    onCallToAction,
    fullscreen
  } = props;

  const classes = classNames('PageHeader', fullscreen && 'fullscreen');

  return (
    <div className={classes}>
      <Container>
        <Grid relaxed="very" verticalAlign="middle" stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h1" color="purple" className="title">
                {title}
                <Header.Subheader>
                  {subtitle}
                </Header.Subheader>
              </Header>
              {children && (<Divider hidden />)}
              {children}
              <Divider hidden />
              <Button primary circular onClick={onCallToAction}>
                {callToAction}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Image src={orca} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};
