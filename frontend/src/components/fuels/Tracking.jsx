import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGVqYXNwYXRpbDk4NzM0IiwiYSI6ImNtNWw3N3JpejE1bTAycnF3NG8wNGxsaGIifQ.Ul9_BiaFULtYbfpzUPt5mw '; // Replace with your Mapbox access token

const socket = io('http://localhost:8080'); // Backend server URL

const Tracking = () => {
  const [locationInfo, setLocationInfo] = useState({
    city: '',
    address: '',
    pincode: '',
  });
  const [vehicles, setVehicles] = useState([]); // Track multiple vehicles
  const [userLocation, setUserLocation] = useState(null);
  const geocodingApiKey = '3a101c8c7ff04c638d89b6467bad0a41'; // Replace with your OpenCage API key
  const markersRef = React.useRef(new Map()); // Store vehicle markers by ID
  const mapRef = React.useRef(null); // Mapbox map instance

  const getLocationDetails = async (latitude, longitude) => {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: geocodingApiKey,
        q: `${latitude},${longitude}`,
        language: 'en',
      },
    });
    console.log('OpenCage API Response:', response.data);

    const result = response.data.results[0];
    if (result) {
      setLocationInfo({
        city: result.components.city || result.components.town || result.components.village || 'N/A',
        address: result.formatted || 'N/A',
        pincode: result.components.postcode || 'N/A',
      });
    }
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};


useEffect(() => {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) {
    console.error("Map container (#map-container) not found.");
    return;
  }

  const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [77.5946, 12.9716], // Default center (Bangalore)
    zoom: 14,
  });

  map.on('load', () => {
    console.log('Mapbox map has loaded.');
    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          setUserLocation({ latitude, longitude });

          // Fetch location details
          const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
              key: geocodingApiKey,
              q: `${latitude},${longitude}`,
              language: 'en',
            },
          });

          const result = response.data.results[0];
          if (result) {
            const city = result.components.city || result.components.town || result.components.village || 'N/A';
            const address = result.formatted || 'N/A';

            // Add marker with city and address in popup
            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([longitude, latitude])
              .setPopup(
             
              new mapboxgl.Popup().setHTML(
                `<strong>City:</strong> ${city}<br/><strong>Address:</strong> ${address}`
              )
            )
            .addTo(map);
        

            map.flyTo({ center: [longitude, latitude], zoom: 14 });

            // Update location info state
            setLocationInfo({
              city,
              address,
              pincode: result.components.postcode || 'N/A',
            });
          }
        },
        (error) => console.error('Error fetching user location:', error)
      );
    }
  });

  return () => {
    map.remove();
  };
}, []);

  

  return (
    <div>
      <h1>Vehicle Tracking</h1>
      <div>
        <strong>City:</strong> {locationInfo.city} <br />
        <strong>Address:</strong> {locationInfo.address} <br />
        <strong>Pincode:</strong> {locationInfo.pincode}
      </div>

      <div id="map-container" style={{ width: '100%', height: '500px' }}></div>

      {/* <div>
        <h2>Vehicles</h2>
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.latitude}</td>
                <td>{vehicle.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div>
  <h2>Devices</h2>
  <table border="1" style={{ width: '100%', textAlign: 'left' }}>
    <thead>
      <tr>
        <th>Device</th> {/* Updated from Vehicle ID to Device */}
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>
    <tbody>
      {vehicles.map((vehicle) => (
        <tr key={vehicle.id}>
          <td>{vehicle.id}</td> {/* Assuming the "id" represents the device */}
          <td>{vehicle.latitude}</td>
          <td>{vehicle.longitude}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Tracking;
