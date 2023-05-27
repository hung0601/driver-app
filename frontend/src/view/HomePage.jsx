import "../App.css";
import { loadMap, setLocation } from "../api/map";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    loadMap();
    setLocation();
  });

  return (
    <div className="App">
      <div className="pac-card" id="pac-card">
        <div id="pac-container">
          <input
            id="pac-input"
            className="pac-input"
            type="text"
            placeholder="Enter start location"
          />
          <input
            id="pac-input2"
            className="pac-input"
            type="text"
            placeholder="Enter end location"
          />
        </div>
      </div>
      <div id="map"></div>
      <div id="infowindow-content">
        <span id="place-name" className="title"></span>
        <br />
        <span id="place-address"></span>
      </div>
    </div>
  );
}

export default HomePage;
