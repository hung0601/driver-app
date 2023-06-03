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
                <img className="anh-dai-dien" src={'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-cute.jpg'}/>
                <p>5 <img src="https://quocvuongtravel.com/media/upload/hangsx/01121865.png" className="icon-start"/></p>
              </div>
              <div className="popup-content-container">
                <p>氏名: Nguyen Van An</p>
                <p>電話番号: 0112345678</p>
                <p>ブランド:Mazda</p>
                <p>プレート: 287-999</p>
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





