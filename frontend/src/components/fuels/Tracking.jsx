import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGVqYXNwYXRpbDk4NzM0IiwiYSI6ImNtNWw3N3JpejE1bTAycnF3NG8wNGxsaGIifQ.Ul9_BiaFULtYbfpzUPt5mw'; // Replace with your Mapbox access token

const socket = io('http://localhost:8080'); // Backend server URL

const Tracking = () => {
  const [locationInfo, setLocationInfo] = useState({
    city: '',
    address: '',
    pincode: '',
  });

  const [vehicles, setVehicles] = useState([]); // Track multiple vehicles' locations
  const [userLocation, setUserLocation] = useState(null); // To store the user's current location

  const geocodingApiKey = '3a101c8c7ff04c638d89b6467bad0a41'; // Geocoding API Key

  const getLocationDetails = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          key: geocodingApiKey,
          q: `${latitude},${longitude}`,
          language: 'en',
        },
      });

      const result = response.data.results[0];
      console.log('Geocoding API response:', result); // Log the API response for debugging

      if (result) {
        setLocationInfo({
          city: result.components.city || result.components.town || 'N/A', // Fallback to 'town' if 'city' is missing
          address: result.formatted || 'N/A',
          pincode: result.components.postcode || 'N/A',
        });
      } else {
        console.log('No address found for this location');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map-container', // The id of the container
      style: 'mapbox://styles/mapbox/streets-v11', // Choose a Mapbox style
      center: [77.5946, 12.9716], // Default initial position (e.g., Bangalore)
      zoom: 12, // Zoom level
    });

    const markers = []; // Store markers for all vehicles and user

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Add user location marker to the map
          const userMarker = new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setText('Your Location'))
            .addTo(map);

          markers.push(userMarker);

          // Fetch user's location details (city, address, pincode)
          getLocationDetails(latitude, longitude);

          // Pan map to user's location
          map.flyTo({
            center: [longitude, latitude],
            essential: true,
            zoom: 14, // Increase zoom level for better visibility
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }

    // Listen for vehicle location updates from backend
    socket.on('vehicleLocationUpdate', (vehicle) => {
      const { latitude, longitude, id } = vehicle;

      // Log vehicle location for debugging
      console.log('Vehicle Location:', latitude, longitude);

      // Update vehicle state
      setVehicles((prevVehicles) => {
        const updatedVehicles = prevVehicles.filter((v) => v.id !== id);
        return [...updatedVehicles, vehicle];
      });

      // Check if marker already exists for the vehicle, else create a new one
      let marker = markers.find((m) => m.id === id);

      if (!marker) {
        marker = new mapboxgl.Marker({ scale: 1.5 }) // Increase marker size for visibility
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setText(`Vehicle ID: ${id}`))
          .addTo(map);
        marker.id = id; // Store id on the marker
        markers.push(marker); // Add marker to array
        console.log('Created new marker for vehicle', id); // Log marker creation
      } else {
        marker.setLngLat([longitude, latitude]); // Update marker position
        console.log('Updated marker for vehicle', id); // Log marker update
      }

      // Pan map to the first vehicle
      if (markers.length > 0) {
        map.flyTo({
          center: [longitude, latitude],
          essential: true,
          zoom: 14, // Ensure zoom is high enough
        });
      }

      // Fetch location details for the first vehicle
      if (vehicle.id === vehicles[0]?.id) {
        getLocationDetails(latitude, longitude);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off('vehicleLocationUpdate');
      markers.forEach((marker) => marker.remove()); // Remove all markers
      map.remove(); // Remove map when component unmounts
    };
  }, [vehicles]);

  return (
    <div>
      <h1>Vehicle Tracking</h1>
      <p><strong>City:</strong> {locationInfo.city}</p>
      <p><strong>Address:</strong> {locationInfo.address}</p>
      <p><strong>Pincode:</strong> {locationInfo.pincode}</p>

      <div id="map-container" style={{ width: '100%', height: '100vh' }}></div>

      {/* Display information for all vehicles */}
      <div>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <h3>Vehicle {vehicle.id}</h3>
            <p><strong>Latitude:</strong> {vehicle.latitude}</p>
            <p><strong>Longitude:</strong> {vehicle.longitude}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
