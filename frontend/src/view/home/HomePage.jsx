import "./HomePage.css";
import { loadMap, setLocation } from "../../api/map";
import { useState } from "react";
import {
  CalendarIcon,
  EndIcon,
  StartIcon,
  CarIcon,
  BikeIcon,
} from "../../asset/icons";
import { useSelector, useDispatch } from "react-redux";
import { selectTrip } from "../../store/modules/trip";
import $ from "jquery";
import axios from "axios";
import echo from "../../service/socket";
import { Modal } from "antd";
import { message } from "antd";

import { setDriver } from "../../store/modules/trip";

import hourOrderConfig from "../../component/popup/hour_order";
import driverInfoConfig from "../../component/popup/driver-info";
import weeklyOrderConfig from "../../component/popup/weekly-order";

setLocation();
loadMap();
function HomePage() {
  const trip = useSelector(selectTrip);
  const [type, setType] = useState(0);
  const [orderType, setOrderType] = useState("0");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleBikeSelect = () => {
    if (type !== 0) {
      setType(0);
      $("#0").addClass("selected");
      $("#1").removeClass("selected");
    }
  };
  const handleCarSelect = () => {
    if (type !== 1) {
      setType(1);
      $("#1").addClass("selected");
      $("#0").removeClass("selected");
    }
  };
  const handleSelectOrderType = (event) => {
    setOrderType(event.target.value);
  };
  const stopListen = () => {
    echo.channel("hello").stopListening(".message");
  };
  const listenMsg = () => {
    echo.channel("hello").listen(".message", (event) => {
      if (event.status === 1) {
        dispatch(setDriver(event.data));
      }
      message.destroy();
      setLoading(false);
      Modal.info(driverInfoConfig);
      stopListen();
    });
  };

  const sendMessage = () => {
    switch (orderType) {
      case "0":
        var postData = trip;
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        };
        listenMsg();
        setLoading(true);
        message.loading("検索中...");
        axios
          .post(`http://localhost:8000/api/message`, postData, axiosConfig)
          .catch((error) => console.log(error));
        break;
      case "1":
        Modal.confirm(hourOrderConfig);
        break;
      case "2":
        Modal.confirm(weeklyOrderConfig);
        break;
      default:
        break;
    }
  };
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
            <select
              className="pac-input"
              id="order-type"
              value={orderType}
              onChange={handleSelectOrderType}
            >
              <option value="0">今すぐ</option>
              <option value="1">指定日時</option>
              <option value="2">定期的</option>
            </select>
          </div>
        </div>
      </div>
      <div className="result hide">
        <div className="driver-type">
          <div
            id="0"
            onClick={handleBikeSelect}
            className="motorbike type selected"
          >
            <div className="discript">
              <img src={BikeIcon} alt="bike icon"></img>
              <h2>バイク</h2>
            </div>
            <p className="price">
              <span>30000</span> VND
            </p>
          </div>
          <div id="1" onClick={handleCarSelect} className="car type">
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
        {loading ? (
          <button disabled onClick={sendMessage} className="submit-btn">
            行くよう
          </button>
        ) : (
          <button onClick={sendMessage} className="submit-btn">
            行くよう
          </button>
        )}
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
