import "./HomePage.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Modal, message } from "antd";
import echo from "../../service/socket";
import store from "../../store";

import { selectTrip, setDriver, setDriverType } from "../../store/modules/trip";
import {
  CalendarIcon,
  EndIcon,
  StartIcon,
  CarIcon,
  BikeIcon,
} from "../../asset/icons";
import {
  loadMap,
  setLocation,
  setMark,
  setNearbyMark,
  removeMarkers,
  setDirection,
} from "../../api/map";

import hourOrderConfig from "../../component/popup/hour_order";
import driverInfoConfig from "../../component/popup/driver-info";
import weeklyOrderConfig from "../../component/popup/weekly-order";
import driverReviewConfig from "../../component/popup/driver-review";
import { useCallback } from "react";

setLocation();
//const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function HomePage() {
  const trip = useSelector(selectTrip);
  const [type, setType] = useState(1);
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState("0");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const listenCompletedEvent = useCallback(() => {
    echo.channel("completeTrip").listen(".complete", (event) => {
      showModal();
      echo.channel("completeTrip").stopListening(".complete");
    });
  }, []);

  const listenMsg = useCallback(() => {
    echo.channel("hello").listen(".message", (event) => {
      console.log(event);
      if (event.status === 1) {
        removeMarkers();
        setMark(event.data);
        store.dispatch(setDriver(event.data));
        Modal.info(driverInfoConfig);
        setStep(2);
        listenCompletedEvent();
      } else {
        Modal.info({
          title: (
            <div className="modalTitle">
              <h2>ドライバーが見つけません。申し訳ありません。</h2>
            </div>
          ),
          content: <p />,
          icon: <p />,
          okText: "閉じる",
        });
      }
      message.destroy();
      setLoading(false);
    });
  }, [listenCompletedEvent]);
  useEffect(() => {
    loadMap();
    listenMsg();
    listenScheduleEvent();
  }, [listenMsg]);
  const listenScheduleEvent = () => {
    echo.channel("schedule").listen(".schedule_send", async (event) => {
      message.info(
        "予約していた乗車の時間です。システムは自動的にドライバーを見つけます。"
      );
      setType(event.data.driver_type);
      store.dispatch(setDriverType(event.data.driver_type));
      await setDirection(event.data.start_location, event.data.end_location);
      setLoading(true);
      message.loading("検索中...", 180);
    });
  };
  const handleBikeSelect = () => {
    if (type !== 1) {
      setType(1);
      dispatch(setDriverType(1));
      setNearbyMark(trip.start.location, 1);
    }
  };
  const handleCarSelect = () => {
    if (type !== 2) {
      setType(2);
      dispatch(setDriverType(2));
      setNearbyMark(trip.start.location, 2);
    }
  };
  const handleSelectOrderType = (event) => {
    setOrderType(event.target.value);
  };

  const sendMessage = () => {
    dispatch(setDriverType(type));
    switch (orderType) {
      case "0":
        var postData = store.getState().trip;
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        };
        setLoading(true);
        message.loading("検索中...", 180);
        axios
          .post(
            "http://localhost:8000/api/customer/find-driver",
            postData,
            axiosConfig
          )
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
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
  const showModal = () => {
    Modal.confirm(driverReviewConfig);
  };
  return (
    <div className="App">
      <div className={step === 2 ? "pac-card hide" : "pac-card"} id="pac-card">
        <div id="pac-container">
          <div className="input-element">
            <img className="icons" src={StartIcon} alt="start icons" />
            <input
              id="pac-input"
              className="pac-input"
              type="text"
              placeholder="自分の場所"
            />
          </div>
          <div className="input-element">
            <img className="icons" src={EndIcon} alt="start icons" />
            <input
              id="pac-input2"
              className="pac-input"
              type="text"
              placeholder="目的地"
            />
          </div>
          <div className="input-element">
            <img className="icons" src={CalendarIcon} alt="start icons" />
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
      {step === 1 ? (
        <div className="result hide">
          <div className="driver-type">
            <div
              id="0"
              onClick={handleBikeSelect}
              className={
                type === 1 ? "motorbike type selected" : "motorbike type"
              }
            >
              <div className="discript">
                <img src={BikeIcon} alt="bike icon" />
                <h2>バイク</h2>
              </div>
              <p className="price">
                <span>30000</span> VND
              </p>
            </div>
            <div
              id="1"
              onClick={handleCarSelect}
              className={type === 2 ? "car type selected" : "car type"}
            >
              <div className="discript">
                <img src={CarIcon} alt="car icon" />
                <h2>車</h2>
              </div>
              <p className="price">
                <span>30000</span> VND
              </p>
            </div>
          </div>
          <div className="discount">
            <label htmlFor="code">割合：</label>
            <input name="code" type="text" placeholder="コードを入力" />
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
      ) : (
        <div className="result">
          <div className="driver-type">
            <div id="0" className="type-result type">
              {trip.type === 1 ? (
                <div className="discript">
                  <img src={BikeIcon} alt="bike icon" />
                  <h2>バイク</h2>
                </div>
              ) : (
                <div className="discript">
                  <img src={CarIcon} alt="car icon" />
                  <h2>車</h2>
                </div>
              )}

              <p className="price">
                <span>
                  {(trip.route.value / 1000).toFixed(1) * trip.type * 10000}
                </span>{" "}
                VND
              </p>
            </div>
            <div className="cancel-box">
              <button>キャンセル</button>
            </div>
          </div>
        </div>
      )}
      <div id="map" />
      <div id="infowindow-content">
        <span id="place-name" className="title" />
        <br />
        <span id="place-address" />
      </div>
    </div>
  );
}

export default HomePage;
