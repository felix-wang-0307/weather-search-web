import React, { useState, useCallback, useMemo, useRef } from 'react';
import { ContentTabs } from './contentTabs';
import { Container, Button } from 'react-bootstrap';
import DayView from './dayView';

export default function ResultContent() {
  const tabRef = useRef<{ getActiveTab: () => string }>(null);

  const [activeTab, setActiveTab] = useState('day');
  
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <>
      <Container className="mt-3 d-flex justify-content-end">
        <ContentTabs ref={tabRef} onTabChange={handleTabChange}/>
      </Container>
      <Container fluid>
        {activeTab === 'day' && <DayView />}
        {activeTab === 'chart' && <div>Daily Temp. Chart</div>}
        {activeTab === 'meteogram' && <div>Meteogram</div>}
      </Container>
    </>
  );
}