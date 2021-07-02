import React, { useState } from "react";
import { Marker, GoogleMap, InfoWindow } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { minerals } from "./data/minerals";
import styled from "styled-components/macro";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 8,
};

const center = {
  lat: 54.2511,
  lng: -4.4632,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  minZoom: 3,
  maxZoom: 16,
  restriction: {
    // latLngBounds: {
    //   north: 59,
    //   south: 49,
    //   west: -59,
    //   east: 14,
    // },
    strictBounds: false,
  },
};

const MineralMap = () => {
  const [selected, setSelected] = useState('');
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={3}
      center={center}
      options={options}
    >
      {minerals.map((marker) => (
        <Marker
          className="marker"
          key={marker.name}
          position={{
            lat: parseFloat(marker.coordinates.lat),
            lng: parseFloat(marker.coordinates.lng),
          }}
          onClick={() => {
            setSelected(marker);
          }}
          icon={{
            url: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='10' fill='rgb(67, 150, 229)' stroke="rgba(255,255,255,0.4)" fill-opacity="0.6"/></svg>`,
            anchor: new window.google.maps.Point(0, 0),
          }}
        />
      ))}
      
      {selected ? (
        <InfoWindow
          className="info"
          position={{
            lat: parseFloat(selected.coordinates.lat),
            lng: parseFloat(selected.coordinates.lng),
          }}
          onCloseClick={() => {
            setSelected(null);
            document.activeElement.blur();
          }}
        >
          <div>
            <h2>{selected.name}</h2>
          </div>
        </InfoWindow>
      ) : null} 
    </GoogleMap>
  );
};

export default MineralMap;
