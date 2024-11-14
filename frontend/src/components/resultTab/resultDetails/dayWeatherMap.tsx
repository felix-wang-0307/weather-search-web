import React, { useEffect, useRef } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { Map, AdvancedMarker, useApiIsLoaded } from '@vis.gl/react-google-maps';

export default function DayWeatherMap({ geocodingData }) {
  const { latitude, longitude } = geocodingData;
  const apiIsLoaded = useApiIsLoaded();
  console.log('apiIsLoaded', apiIsLoaded);

  return <div id="map" >
    {apiIsLoaded ? <Map
      mapId={'DEMO-MAP'}
      style={{ width: '100%', height: '600px' }}
      defaultCenter={{lat: latitude, lng: longitude}}
      defaultZoom={15}
      gestureHandling={'greedy'}
      // disableDefaultUI={true}
    >
      <AdvancedMarker position={{lat: latitude, lng: longitude}} />
    </Map>  : <Alert variant='warning'>
      Failed to load Google Maps API
    </Alert>}
  </div> ;
}