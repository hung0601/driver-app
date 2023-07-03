import React from "react";
import axios from "axios";
import { Input, TimePicker, Form, Select, ConfigProvider } from "antd";
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
let timeOut = "00:00";
let day;

const config = {
  title: (
    <div className="modalTitle">
      <h2>定期的</h2>
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
    var postData = {
      id: 1,
      pickup_time: timeOut,
      start: store.getState().trip.start.placeId,
      end: store.getState().trip.end.placeId,
      driver_type: store.getState().trip.type,
      day: day.map((item) => item + 1),
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        "http://localhost:8000/api/customer/set-weekly-schedule",
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

  //   const labelCol = { sm: { span: 2, offset: 0 } };
  //   const wrapperCol = { sm: { span: 22, offset: 0 } };
  const selectOption = [
    {
      label: "月曜日",
      value: 0,
    },
    {
      label: "火曜日",
      value: 1,
    },
    {
      label: "水曜日",
      value: 2,
    },
    {
      label: "木曜日",
      value: 3,
    },
    {
      label: "金曜日",
      value: 4,
    },
    {
      label: "土曜日",
      value: 5,
    },
    {
      label: "日曜日",
      value: 6,
    },
  ];
  const handleChange = (value) => {
    day = value;
  };
  const onTimeChange = (time, timeString) => {
    timeOut = timeString;
  };
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
          label={<FontAwesomeIcon icon="fa-solid fa-stopwatch" size="xl" />}
        >
          <TimePicker
            defaultValue={dayjs("00:00", format)}
            format={format}
            onChange={onTimeChange}
          />
        </Form.Item>
        <h3>繰り返す</h3>
        <Form.Item
          label={<FontAwesomeIcon icon="fa-solid fa-calendar-week" size="xl" />}
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="選んでください"
            defaultValue={[]}
            options={selectOption}
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
export default config;
