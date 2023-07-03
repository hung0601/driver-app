import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "../../../store";
import axios from "axios";

// refresh

import jaJP from "antd/locale/ja_JP";
import "./index.css";

import { Rate, Input } from "antd";

const locale = jaJP;
let starOut;
let reviewOut = "";
const config = {
  title: <div></div>,
  content: (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <Content />
      </ConfigProvider>
    </Provider>
  ),
  icon: <p />,
  okText: "送る",
  cancelText: "スキップ",
  onOk() {
    var postData = {
      id: store.getState().trip.driver.tripId,
      star: starOut,
      review: reviewOut,
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        "http://localhost:8000/api/customer/review-driver",
        postData,
        axiosConfig
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  onCancel() {
    window.location.reload();
  },
};
function Content() {
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  return (
    <div className="container">
      <div className="img"></div>
      <div className="text">
        <h3>
          <strong>完了しました！</strong>
        </h3>
        <p>乗車とドライバーはどうですか？</p>
      </div>
      <Rate
        value={star}
        onChange={(value) => {
          setStar(value);
          starOut = value;
        }}
      />
      <div className="input">
        <p>レビュー</p>
        <Input
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            reviewOut = e.target.value;
          }}
          className="text-box"
          placeholder=""
        />
      </div>
    </div>
  );
}
export default config;
