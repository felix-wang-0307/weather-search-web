import React, { useContext } from 'react';
import { ResultHeader } from './resultHeader';
import { AppContext } from '../../appContext';
import { IFormData } from '../../types';
import { Container } from 'react-bootstrap';
import ResultContent from './resultContent';

export default function ResultTab ({ searchStatus }) {
  const { city, state } = useContext(AppContext)[0];

  return (
    <Container>
      <ResultHeader />
      <ResultContent />
    </Container>
  )
}