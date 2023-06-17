import React from "react";
import { Input, TimePicker, DatePicker, Form } from "antd";
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
  icon: <p></p>,
  okText: "設定",
  cancelText: "キャンセル",
  onOk() {
    console.log("ok click");
  },
};
function Content() {
  const trip = useSelector(selectTrip);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item
          label={<FontAwesomeIcon icon="fa-solid fa-stopwatch" size="xl" />}
        >
          <TimePicker defaultValue={dayjs("12:08", format)} format={format} />
        </Form.Item>
      </Form>
    </div>
  );
}
export default config;
