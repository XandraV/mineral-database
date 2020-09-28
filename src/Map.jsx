import React from "react";
import mapboxgl from "mapbox-gl";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Menu } from "./Menu";
import "./App.css";
import { mapData } from "./data/mapData";
import styled from "styled-components/macro";
const StyledMap = styled.div`
  position: absolute;
  width: 63%;
  top: 15%;
  bottom: 6%;
  border-radius: 10px;
`;
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FuZHJhZXhwbG9yZXMiLCJhIjoiY2pveXYzYmZsMmZzMzN2cGFkaDFzcnc4ZyJ9.jVMo-5f0RWDTv4FDD6WOLQ";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenMineral: null,
      lng: 10.926,
      lat: 36.695,
      zoom: 1.45,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/sandraexplores/ck5yg2w1i0cq61ijwkdzib1w4",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.on("load", () => {
      map.loadImage(
        "https://images.vexels.com/media/users/3/151224/isolated/preview/58003c389b57ec8182abf593984eaa82-slot-diamond-icon-by-vexels.png",
        (error, image) => {
          if (error) throw error;
          map.addImage("diamond", image);
          // Add a layer showing the places.
          map.addLayer({
            id: "places",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: mapData,
              },
            },
            layout: {
              "icon-image": "diamond",
              "icon-size": 0.05,
              "icon-allow-overlap": true,
            },
          });
        }
      );
    });

    map.on("mouseenter", "places", (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on("mouseleave", "places", () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });

    // Event listener for clicking the gem icons
    map.on("click", (e) => {
      let clickedPointcoordinates;
      // Query all the rendered points in the view
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["places"],
      });
      features[0] !== undefined
        ? (clickedPointcoordinates = features[0].geometry.coordinates)
        : (clickedPointcoordinates = [e.lngLat.lng, e.lngLat.lat]);
      flyToPlace(map, clickedPointcoordinates);
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
  }

  handleListItemClick(rock) {
    this.setState({
      chosenMineral: this.state.chosenMineral === rock ? null : rock,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Menu title="Map" />
        <div style={{ paddingLeft: "5rem" }}>
          <StyledMap ref={(el) => (this.mapContainer = el)} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Map;

function flyToPlace(map, currentFeature) {
  map.flyTo({
    center: currentFeature,
    zoom: 10,
  });
}

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});
