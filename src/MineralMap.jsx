import React, { useEffect, useState, useCallback, useRef } from "react";
import { Marker, GoogleMap, InfoWindow } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import Menu from "./Menu";
const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 54.2511,
  lng: -4.4632,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function MineralMap() {
  const mapRef = useRef();
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([
    { name: "London", lat: 51.509865, lng: -0.118092 },
    { name: "Edinburgh", lat: 55.953251, lng: -3.188267 },
  ]);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <>
      <Menu />
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={4}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            className="marker"
            key={marker.name}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}

            icon={{
              url: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='10' fill='lightblue' stroke="white" fill-opacity="0.6"/></svg>`,
              anchor: new window.google.maps.Point(15, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            className="info"
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.name}</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}

export default MineralMap;
