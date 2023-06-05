import React from "react";
import './Popup.css';

const Popup = props => {
    return (
      <div className="popup-box-cho-xe">
        <div className="box">
          {/* <span className="close-icon" onClick={props.handleClose}>x</span> */}
          <div className="popup-container">
            <div className="popup-header">
              <b>ドライバーが見つけました。ちょっと待ってください。</b>
            </div>
            <div className="popup-content">
              <div className="popup-content-header">
                <img className="anh-dai-dien" src={'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-cute.jpg'} alt=""/>
                <p>5 <img src="https://quocvuongtravel.com/media/upload/hangsx/01121865.png" className="icon-start" alt=""/></p>
              </div>
              <div className="popup-content-container">
                <div className="popup-content-container-item">
                  <label>氏名</label>
                  <p> Nguyen Van An</p>
                </div>
                <div className="popup-content-container-item">
                  <label>電話番号</label>
                  <p> 0112345678</p>
                </div>
                <div className="popup-content-container-item">
                  <label>ブランド</label>
                  <p>Mazda</p>
                </div>
                <div className="popup-content-container-item">
                  <label>プレート</label>
                  <p>287-999</p>
                </div>


              </div>

            </div>
            <div className="popup-content-footer">
                <button onClick={props.handleClose}>閉じる</button>

            </div>

          </div>
        </div>
      </div>
    );
  };

  export default Popup;





