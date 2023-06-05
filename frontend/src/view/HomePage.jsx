import "../App.css";
import { loadMap, setLocation } from "../api/map";
import { useEffect,useState } from "react";
// import { Link } from 'react-router-dom';
//linh
// import Popup from '../components/popupchoxe/Popup';
function HomePage() {
  useEffect(() => {
    loadMap();
    setLocation();
  });

// linh
// const [isOpen, setIsOpen] = useState(false);

// const togglePopup = () => {
//   setIsOpen(!isOpen);
// };

//linh

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
      {/* <div>
         <input type="button" value="Click to Open Popup" onClick={togglePopup} />
         {isOpen && (
        <Popup
          handleClose={togglePopup}
        />
      )}
      </div>
      <div>
        <Link to="/profile">
          <button>Go to profile page</button>
        </Link>
      </div> */}
    </div>
  );
}

export default HomePage;
