import React, { useRef, useEffect, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { renderToString } from "react-dom/server";
// import "leaflet/dist/images/marker-icon-2x.png";
// import "leaflet/dist/images/marker-icon.png";
// import "leaflet/dist/images/layers-2x.png";
// import "leaflet/dist/images/layers.png";
// import "leaflet/dist/images/marker-shadow.png";
// import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { makeStyles } from "@material-ui/core";
import LocalContext from "./LocalContext";
import MarkerUpdate from "./MarkerUpdate";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "500px",
    zIndex: 0
  },
  popHeader: {
    textAlign: "center"
  },
  popContent: {
    margin: "5px 0"
  }
});

export const initLatLng = L.latLng(41.713, -100.281);
export const initZoom = 4;

export default function Map() {
  const classes = useStyles();
  const {
    map,
    setMap,
    baseLayer,
    setBaseLayer,
    markers,
    setMarkers,
    landmarks,
    greeting,
    setSelectedMarkerOption,
    showEditor
  } = useContext(LocalContext);
  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current && !map) setMap(initMap(mapRef.current));
  }, [mapRef]);
  useEffect(() => {
    if (map && greeting && greeting.hello && !baseLayer) {
      setBaseLayer(configureBaseLayer(map, greeting.hello));
    }
  }, [map, greeting]);
  useEffect(() => {
    if (map && landmarks) {
      if (markers) markers.forEach(x => map.removeLayer(x));
      setMarkers(configureMarkers(map, landmarks, setSelectedMarkerOption));
    }
  }, [map, landmarks]);
  return (
    <Fragment>
      <div className={classes.map} ref={mapRef} />
      {showEditor && <MarkerUpdate />}
    </Fragment>
  );
}

/**
 * @param {HTMLElement} dom
 * @returns {L.Map}
 */
function initMap(dom) {
  return L.map(dom, { zoomControl: false }).setView(initLatLng, initZoom);
}
/**
 *
 * @param {L.Map} map
 * @param {String} layerAttr
 * @returns {L.TileLayer}
 */
function configureBaseLayer(map, layerAttr) {
  const baseLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution: layerAttr
    }
  );
  if (!map.hasLayer(baseLayer)) map.addLayer(baseLayer);
  return baseLayer;
}

/**
 *
 * @param {L.Map} map
 * @param {Object[]} landmarks
 * @param {Function} setSelectedMarkerOption
 * @returns {L.Marker[]}
 */
function configureMarkers(map, landmarks, setSelectedMarkerOption) {
  return landmarks.map(x => {
    const { coordinates, ...props } = x;
    const [lng, lat] = coordinates;
    return L.marker(L.latLng(lat, lng))
      .bindPopup(renderToString(<Popup {...props} />))
      .on("click", function() {
        map.flyTo(this.getLatLng(), 18, { animate: true, duration: 3 });
        setSelectedMarkerOption({ value: this, label: props.name });
      })
      .addTo(map);
  });
}

function Popup({ name, address, description, url }) {
  const { popHeader, popContent } = useStyles();
  return (
    <div>
      <div className={popHeader}>
        <strong>
          <a href={url} target="_blank">
            {name}
          </a>
        </strong>
      </div>
      <div className={popContent}>
        <strong>{address}</strong>
      </div>
      <div className={popContent}>
        <strong>{description}</strong>
      </div>
    </div>
  );
}
Popup.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string
};
