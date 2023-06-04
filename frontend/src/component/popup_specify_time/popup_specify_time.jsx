import React from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons";

function PopupSpecifyTime() {


    const [date, setDate] = useState(new Date().toLocaleDateString("en-US"))
    const [time, setTime] = useState("10:00")

  return (
    <React.Fragment>
      <div
        style={{
          width: "30%",
          margin: "100px auto",
          position: "relative",
          border: "solid 1px black",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            borderBottom: "solid 1px black",
          }}
        >
          <h1 style={{ textAlign: "center" }}>指定時間</h1>
        </div>
        <div style={{ backgroundColor: "#ddd", padding: 5 }}>
          <div
            style={{
              width: "85%",
              display: "flex",
              margin: "30px auto",
              overflow: "hidden",
            }}
          >
            <FontAwesomeIcon
              icon={faCalendarCheck}
              style={{ fontSize: "40px", flex: 1, marginRight: "20px",  }}
            />
            <input
              type="text"
              style={{ flex: 8, padding: "7px", fontSize: "20px" }}
              placeholder={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div
            style={{
              width: "85%",
              display: "flex",
              margin: "30px auto",
              overflow: "hidden",
            }}
          >
            <FontAwesomeIcon
              icon={faStopwatch}
              style={{ fontSize: "40px", flex: 1, marginRight: "20px",  }}
            />
            <input
              type="text"
              style={{ flex: 8, padding: "7px", fontSize: "20px" }}
              placeholder={time}
              onChange={(e) => setTime(e.target.value)}           
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <button
              style={{
                padding: "5px 30px",
                marginRight: "25px",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              設定
            </button>
            <button
              style={{
                padding: "5px 30px",
                marginLeft: "25px",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
      <button
        style={{
          position: "absolute",
          right: "35%",
          top: "100px",
          borderColor: "black",
          borderWidth: "1px 0px 1px 1px",
          borderStyle: "solid",
          lineHeight: "30px",
          padding: "3px 15px",
          backgroundColor: "#ddd",
        }}
      >
        X
      </button>
    </React.Fragment>
  );
}
export default PopupSpecifyTime;
