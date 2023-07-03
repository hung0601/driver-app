import React from "react";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export default function TripConfirm(props) {
  return (
    <div className="container-info">
      <div className="payment-info">
        <h5>
          <FontAwesomeIcon icon="fa-solid fa-dollar-sign" /> VND ~{" "}
          {(props.trip.route.value / 1000).toFixed(1) * props.trip.type * 10}K
        </h5>
        <div>Payment</div>
      </div>
      <div className="customer-info">
        <div className="customer-name">
          <h5>
            <span>
              <FontAwesomeIcon icon="fa-solid fa-user" />
            </span>
            {props.customer.name}
          </h5>
        </div>
        <div className="customer-phone">
          <h5>
            Phone: <span>{props.customer.phone}</span>
          </h5>
        </div>
      </div>
      <div className="trip">
        <div className="distance-info">
          <p>{props.distance.toFixed(1)} km from you</p>
        </div>
        <div className="location-info">
          <div className="location-address">
            <div className="location-icon">
              <div className="draw-line"></div>
              <FontAwesomeIcon icon="fa-solid fa-circle-dot" />
            </div>
            <div>{props.trip.start.name}</div>
          </div>
          <p>{props.trip.start.address}</p>
        </div>
        <div className="location-info">
          <div className="location-address">
            <div className="location-icon">
              <FontAwesomeIcon icon="fa-solid fa-circle-dot" />
            </div>
            <div>{props.trip.end.name}</div>
          </div>
          <p>{props.trip.end.address}</p>
        </div>
      </div>
    </div>
  );
}
