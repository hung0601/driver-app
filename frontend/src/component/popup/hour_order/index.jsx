import React from "react";
import axios from "axios";
import { Input, TimePicker, DatePicker, Form, ConfigProvider } from "antd";
import { useSelector, Provider } from "react-redux";
import store from "../../../store";

import dayjs from "dayjs";
import jaJP from "antd/locale/ja_JP";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectTrip } from "../../../store/modules/trip";

library.add(fas);
const format = "HH:mm";
const locale = jaJP;
let dateOut = dayjs();
let timeOut = dayjs("00:00", format);
const config = {
  title: (
    <div className="modalTitle">
      <h2>指定日時</h2>
    </div>
  ),
  content: (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <Content />
      </ConfigProvider>
    </Provider>
  ),
  icon: <p />,
  okText: "設定",
  cancelText: "キャンセル",
  onOk() {
    dateOut = dateOut
      .set("hour", timeOut.hour())
      .set("minute", timeOut.minute());
    var postData = {
      id: 1,
      datetime: dateOut.toDate(),
      start: store.getState().trip.start.placeId,
      end: store.getState().trip.end.placeId,
      driver_type: store.getState().trip.type,
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        "http://localhost:8000/api/customer/set-schedule",
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
};
function Content() {
  const trip = useSelector(selectTrip);
  const onDateChange = (date, dateString) => {
    dateOut = date.clone();
  };
  const onTimeChange = (time, timeString) => {
    timeOut = time.clone();
  };
  //   const labelCol = { sm: { span: 2, offset: 0 } };
  //   const wrapperCol = { sm: { span: 22, offset: 0 } };
  return (
    <div>
      <Form colon={false}>
        <h3>自分の場所</h3>
        <Form.Item
          label={<FontAwesomeIcon icon="fa-solid fa-circle-dot" size="xl" />}
        >
          <Input readOnly placeholder="Basic usage" value={trip.start.name} />
        </Form.Item>
        <h3>目的地</h3>
        <Form.Item
          label={<FontAwesomeIcon icon="fa-solid fa-location-dot" size="xl" />}
        >
          <Input readOnly placeholder="Basic usage" value={trip.end.name} />
        </Form.Item>
        <Form.Item
          label={<FontAwesomeIcon icon="fa-solid fa-calendar-days" size="xl" />}
        >
          <DatePicker defaultValue={dayjs()} onChange={onDateChange} />
        </Form.Item>
        <Form.Item
          label={<FontAwesomeIcon icon="fa-solid fa-stopwatch" size="xl" />}
        >
          <TimePicker
            defaultValue={dayjs("00:00", format)}
            format={format}
            onChange={onTimeChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
export default config;
