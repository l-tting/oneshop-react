import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationMap = () => {
  // Nairobi coordinates
  const center = {
    lat: -1.2921,
    lng: 36.8219
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    scaleControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h2>
      <div className="mb-4">
        <p className="text-gray-600">
          Visit us at our office in Nairobi, Kenya. We're here to help you with any questions or concerns.
        </p>
        <address className="mt-2 text-gray-600 not-italic">
          <p>123 Business Street</p>
          <p>Nairobi, Kenya</p>
          <p>Phone: +254 700 000000</p>
        </address>
      </div>
      
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={mapOptions}
        >
          <Marker
            position={center}
            title="MyDuka Location"
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationMap; 