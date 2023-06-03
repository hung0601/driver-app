import React from "react";
import "./profile.css"
function Profile() {
    return(
        <div className="profile-page">
            <div className="profile-container">
                <div className="container-content">
                    <div className="profile-header">
                        <div className="profile-title">
                            プロフィール
                        </div>
                        <div className="profile-header-action">
                            <button className="button-back">戻る</button>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="profile-content-item">
                            <div className="profile-content-title">
                                アカウントの情報
                            </div>
                            <div className="profile-content-container">
                                <div className="content-item">
                                    <label>メール</label>
                                    <p>linhhathi@gmail.com</p>
                                </div>
                                <div className="content-item">
                                    <label>パスワード</label>
                                    <p>123@456#</p>

                                </div>
                                <button style={{marginBottom: '20px'}}>パスワード変更</button>

                            </div>
                        </div>
                        <div className="">
                            <div className="profile-content-title">
                                アバター
                            </div>
                            <button style={{marginBottom: '20px'}} >アバター変更</button>
                            <div className="" style={{textAlign:'center'}}>

                                <img className="anh-dai-dien" src={'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-cute.jpg'}/>
                            </div>

                        </div>
                        <div className="profile-content-item">
                            <div className="profile-content-title">
                                個人情報
                            </div>
                            <div className="profile-content-container">
                                <div className="content-item">
                                    <label>氏名</label>
                                    <p>Nguyen Van An</p>
                                </div>
                                <div className="content-item">
                                    <label>性別</label>
                                    <p>男性</p>
                                </div>
                                <div className="content-item">
                                    <label>誕生日</label>
                                    <p>25/11/2003</p>
                                </div>
                                <div className="content-item">
                                    <label>電話番号</label>
                                    <p>0112345678</p>
                                </div>
                                <div className="content-item">
                                    <label>アドレス</label>
                                    <p>So 1, Dai Co Viet, Hai Ba Trung, Ha Noi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-footer">
                    <button>情報更新</button>
                    </div>
                </div>

            </div>

        </div>
    )};
    export default Profile;
