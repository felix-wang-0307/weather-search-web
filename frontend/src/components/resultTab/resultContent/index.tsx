import React, { useState, useCallback, useRef } from 'react';
import { ContentTabs } from './contentTabs';
import { Container } from 'react-bootstrap';
import DayView from './dayView';
import { DailyTempChart } from './dailyTempChart';
import MeteogramChart from './meteogramChart';

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
        {activeTab === 'chart' && <DailyTempChart />}
        {activeTab === 'meteogram' && <MeteogramChart />}
      </Container>
    </>
  );
}