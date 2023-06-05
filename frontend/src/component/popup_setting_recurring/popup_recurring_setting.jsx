import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

function PopupRecurringSetting() {
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
          <h1 style={{ textAlign: "center" }}>定期的</h1>
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
              style={{ fontSize: "40px", flex: 1, marginRight: "20px" }}
            />
            <input
              type="text"
              style={{ flex: 8, padding: "7px", fontSize: "20px" }}
              placeholder="10:00"
            />
          </div>
          <div style={{ display: "flex", width: "85%", margin: "auto" }}>
            <p
              style={{
                border: "solid 1px black",
                width: "30%",
                fontSize: "22px",
                textAlign: "center",
                margin: "auto",
                // fontWeight: 600,
              }}
            >
              繰り返す
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              margin: "30px auto",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                />
                <label
                  htmlFor=""
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                >
                  月曜日
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                />
                <label
                  htmlFor=""
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                >
                  火曜日
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                />
                <label
                  htmlFor=""
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                >
                  水曜日
                </label>
              </div>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                />
                <label
                  htmlFor=""
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                >
                  木曜日
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                />
                <label
                  htmlFor=""
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                >
                  金曜日
                </label>
              </div>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                />
                <label
                  htmlFor=""
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                >
                  土曜日
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  style={{ width: 18, height: 18 }}
                />
                <label
                  htmlFor=""
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                >
                  日曜日
                </label>
              </div>
            </div>
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
        x
      </button>
    </React.Fragment>
  );
}
export default PopupRecurringSetting;
