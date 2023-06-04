import "../App.css";
import { loadMap, setLocation } from "../api/map";
import { useEffect } from "react";
import {
  CalendarIcon,
  EndIcon,
  StartIcon,
  CarIcon,
  BikeIcon,
} from "../asset/icons";
function HomePage() {
  useEffect(() => {
    loadMap();
    setLocation();
  });
  return (
    <div className="App">
      <div className="pac-card" id="pac-card">
        <div id="pac-container">
          <div className="input-element">
            <img className="icons" src={StartIcon} alt="start icons"></img>
            <input
              id="pac-input"
              className="pac-input"
              type="text"
              placeholder="自分の場所"
            />
          </div>
          <div className="input-element">
            <img className="icons" src={EndIcon} alt="start icons"></img>
            <input
              id="pac-input2"
              className="pac-input"
              type="text"
              placeholder="目的地"
            />
          </div>
          <div className="input-element">
            <img className="icons" src={CalendarIcon} alt="start icons"></img>
            <select className="pac-input" id="order-type">
              <option value="1">今すぐ</option>
              <option value="2">指定日時</option>
              <option value="3">定期的</option>
            </select>
          </div>
        </div>
      </div>
      <div className="result">
        <div className="driver-type">
          <div className="motorbike type">
            <div className="discript">
              <img src={BikeIcon} alt="bike icon"></img>
              <h2>バイク</h2>
            </div>
            <p className="price">
              <span>30000</span> VND
            </p>
          </div>
          <div className="car type">
            <div className="discript">
              <img src={CarIcon} alt="car icon"></img>
              <h2>車</h2>
            </div>
            <p className="price">
              <span>30000</span> VND
            </p>
          </div>
        </div>
        <div className="discount">
          <label htmlFor="code">割合：</label>
          <input name="code" type="text" placeholder="コードを入力"></input>
        </div>
        <button className="submit-btn">行くよう</button>
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
