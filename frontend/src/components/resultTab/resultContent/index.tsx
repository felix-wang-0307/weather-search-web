import React from 'react';
import { ContentTabs } from './contentTabs';
import { Container } from 'react-bootstrap';

export default function ResultContent () {
  return (
    <Container className="mt-3 d-flex justify-content-end">
      <ContentTabs />
    </Container>
  )
}