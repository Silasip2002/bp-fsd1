import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { getMapCenter } from "../../actions/GoogleMapController";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function GoogleMap() {
  const [center, setCenter] = useState({ lat: 30.3193039, lng: 114.1693611 });
  const [zoom, setZoom] = useState(11);

  const addressState = useSelector(getMapCenter);
  const addressObject = addressState.payload.googleMap.mapCenter;

  useEffect(() => {
    console.log(addressObject.lat);
    if (addressObject) {
      setCenter({ lat: addressObject.lat, lng: addressObject.lng });
    }
  }, [addressObject]);

  // const updateLocation = () => {
  //   setCenter(addressObject);
  // };

  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        height: "50vh",
        width: "50%",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "yor key" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* <AnyReactComponent
          lat={addressObject.lat}
          lng={addressObject.lng}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  );
}
