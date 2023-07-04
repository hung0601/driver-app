import React from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import "./index.css";
import { Component } from "react";
import echo from "../../service/socket";
// import { Modal } from "antd";
// import { message } from "antd";
import driverDB from "../../api/firebase";
import { ref, update, child, get } from "firebase/database";
import { Switch } from "antd";
import { Modal } from "antd";
import { DriverIcon } from "../../asset/icons";
import TripConfirm from "../../component/popup/driver-confirm";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const options = {
  mapTypeId: "terrain",
  disableDefaultUI: true,
  zoom: 13,
};
const libraries = ["places"];

class DriverPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: "DRIVING",
      origin: "",
      destination: "",
      isChange: true,
      driver: null,
      step: 1,
      trip: null,
    };
    this.origin = null;
    this.destination = null;
    this.openConfrimModal = this.openConfrimModal.bind(this);
    this.listenChooseMsg = this.listenChooseMsg.bind(this);
    this.completeTrip = this.completeTrip.bind(this);
    this.clearDirection = this.clearDirection.bind(this);
    this.setDriverStatus = this.setDriverStatus.bind(this);
    this.directionsCallback = this.directionsCallback.bind(this);
  }
  async componentDidMount() {
    const id = Number(window.location.href.split("/")[4]);
    const dbRef = ref(driverDB);
    this.listenChooseMsg();

    get(child(dbRef, `driver/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          this.setState(() => ({
            driver: data,
          }));
          console.log(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  completeTrip() {
    const postData = {
      id: this.state.driver.id,
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        "http://localhost:8000/api/customer/complete-trip",
        postData,
        axiosConfig
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  openConfrimModal() {
    Modal.confirm({
      title: <div></div>,
      content: <TripConfirm />,
      icon: <p />,
      okText: "Confirm",
      cancelText: "Reject",
      onOk: () => {},
    });
  }
  listenChooseMsg() {
    const id = Number(window.location.href.split("/")[4]);
    echo.channel("driverChoose" + id).listen(".choose", (event) => {
      console.log(event);
      Modal.confirm({
        title: <div></div>,
        content: (
          <TripConfirm
            trip={event.trip}
            customer={event.customer}
            distance={event.distance}
          />
        ),
        icon: <p />,
        okText: "Confirm",
        cancelText: "Refuse",
        onOk: () => {
          this.setState(() => ({
            trip: event.trip,
            origin: event.trip.start.placeId,
            destination: event.trip.end.placeId,
            step: 2,
          }));
          var postData = {
            id: id,
            isAccepted: 1,
            start: event.trip.start.placeId,
            end: event.trip.end.placeId,
          };
          console.log(postData);
          const axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          };
          axios
            .post(
              "http://localhost:8000/api/customer/trip-accept",
              postData,
              axiosConfig
            )
            .catch((error) => {
              console.log(error);
            });
        },
        onCancel: () => {
          var postData = {
            id: id,
            isAccepted: 0,
            trip: event.trip,
            excludes: event.excludes.concat(" ", id),
          };
          console.log(postData);
          const axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          };
          axios
            .post(
              "http://localhost:8000/api/customer/trip-accept",
              postData,
              axiosConfig
            )
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      });
    });
  }
  setDriverStatus() {
    const id = Number(window.location.href.split("/")[4]);
    const dbRef = ref(driverDB);
    get(child(dbRef, `driver/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.status === 0) data.status = 1;
          else data.status = 0;
          //data.status = status;
          this.setState(() => ({
            driver: data,
          }));
          const updates = {};
          updates["/driver/" + id] = data;
          update(dbRef, updates);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  directionsCallback(res) {
    if (res !== null) {
      if (res.status === "OK") {
        this.setState(() => ({
          response: res,
        }));
      }
    }
    this.setState(() => ({
      isChange: false,
    }));
  }

  clearDirection() {
    this.setState(() => ({
      response: null,
    }));
  }

  render() {
    return (
      <div>
        {this.state.driver ? (
          <div>
            {this.state.step === 2 && (
              <div className="main-container">
                <div className="payment-info">
                  <p>{this.state.trip.start.address}</p>
                  <h5>
                    TaJaTaxi . VND ~{" "}
                    {this.state.trip &&
                      (this.state.trip.route.value / 1000).toFixed(1) *
                        this.state.trip.type *
                        10}
                    K
                  </h5>
                  <div>Payment</div>
                </div>
                <div className="left-icon">
                  <FontAwesomeIcon icon="fa-solid fa-circle-chevron-up" />
                </div>
              </div>
            )}
            <Switch
              defaultChecked={this.state.driver.status}
              onChange={this.setDriverStatus}
              className="active-btn"
            />
            <LoadScript
              googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
              libraries={libraries}
            >
              <GoogleMap
                id="circle-example"
                mapContainerStyle={containerStyle}
                options={options}
                center={this.state.driver.position}
                zoom={13}
              >
                {
                  <div className="mapComponent">
                    <div>
                      <Marker
                        position={this.state.driver.position}
                        icon={DriverIcon}
                      />
                      {this.state.destination !== "" &&
                        this.state.origin !== "" &&
                        this.state.isChange && (
                          <DirectionsService
                            // required
                            options={{
                              destination: {
                                placeId: this.state.destination,
                              },
                              origin: {
                                placeId: this.state.origin,
                              },
                              travelMode: this.state.travelMode,
                            }}
                            // required
                            callback={this.directionsCallback}
                            // optional
                          />
                        )}

                      {this.state.response !== null && (
                        <DirectionsRenderer
                          // required
                          options={{
                            directions: this.state.response,
                          }}
                          // optional
                        />
                      )}
                    </div>
                  </div>
                }
              </GoogleMap>
            </LoadScript>
            {this.state.step === 2 && (
              <div>
                <div className="confirm-btn">
                  <button onClick={this.completeTrip}>Complete Trip</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>No driver</div>
        )}
      </div>
    );
  }
}

export default DriverPage;
