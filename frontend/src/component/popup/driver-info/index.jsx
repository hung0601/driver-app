import React from 'react';

import { ConfigProvider } from 'antd';
import { useSelector, Provider } from 'react-redux';
import { selectTrip } from '../../../store/modules/trip';
import store from '../../../store';

import jaJP from 'antd/locale/ja_JP';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const locale = jaJP;

const config = {
  title: (
    <div className="modalTitle">
      <h2>ドライバーが見つけました。 ちょっと待ってください。</h2>
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
  okText: '閉じる',
};
function Content() {
  const trip = useSelector(selectTrip);

  return (
    <div className="popup-box-cho-xe">
      <div className="box">
        <div className="popup-container">
          <div className="popup-content">
            <div className="popup-content-header">
              <img className="anh-dai-dien" src={trip.driver.avatar} alt="" />
              <p>
                {trip.driver.rate}
                {' '}
                <img
                  src="https://quocvuongtravel.com/media/upload/hangsx/01121865.png"
                  className="icon-start"
                  alt=""
                />
              </p>
            </div>
            <div className="popup-content-container">
              <div className="popup-content-container-item">
                <label>氏名</label>
                <p>
                  {' '}
                  {trip.driver.name}
                </p>
              </div>
              <div className="popup-content-container-item">
                <label>電話番号</label>
                <p>{trip.driver.phone}</p>
              </div>
              <div className="popup-content-container-item">
                <label>ブランド</label>
                <p>{trip.driver.branch}</p>
              </div>
              <div className="popup-content-container-item">
                <label>プレート</label>
                <p>{trip.driver.plate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default config;
