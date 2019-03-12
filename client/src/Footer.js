import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

export default function Footer() {
  return (
    <div className="Footer">
      <Segment vertical padded="very" textAlign="center">
        <Container text>
          Copyright &copy; 2019 WhaleHunter. All Rights Reserved.
        </Container>
      </Segment>
    </div>
  );
}
