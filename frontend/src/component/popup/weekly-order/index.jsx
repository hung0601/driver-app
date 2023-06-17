import React from "react";
import { Input, TimePicker, Form, Select } from "antd";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { selectTrip } from "../../../store/modules/trip";
import store from "../../../store";
import { Provider } from "react-redux";
import dayjs from "dayjs";
import jaJP from "antd/locale/ja_JP";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);
const format = "HH:mm";
const locale = jaJP;

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
  icon: <p></p>,
  okText: "設定",
  cancelText: "キャンセル",
  onOk() {
    console.log("ok click");
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
          <TimePicker defaultValue={dayjs("12:08", format)} format={format} />
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
          />
        </Form.Item>
      </Form>
    </div>
  );
}
export default config;
