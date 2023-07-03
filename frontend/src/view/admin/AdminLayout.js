import { BsPerson } from 'react-icons/bs';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import './admin_layout.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminLayout(props) {
  const [isMore, setIsMore] = useState([false, false]);

  const handleExpand = (id) => {
    const newIsMore = [...isMore];
    newIsMore[id] = !newIsMore[id];
    setIsMore(newIsMore);
  };

  return (
    <>
      <div className="container-fluid border-bottom p-3 text-center header">
        <h4>{props.page_title ? props.page_title : 'TaJa'}</h4>
      </div>
      <div className="d-flex border-bottom" style={{ minHeight: '90.6vh' }}>
        <div className="border-end sidebar">
          <div className="fw-bold  py-2 text-center">
            <span style={{ fontSize: '22px' }}><BsPerson /></span>
                        &nbsp;アドミン
          </div>
          <div className="d-flex flex-column mt-4 text-center">
            <div className="d-flex justify-content-center">
              <div style={{ width: '90%' }}>
                <div className="p-2 mb-2 border right-align-parent menu-item" onClick={() => handleExpand(0)}>
                  <span className="fw-bold">統計</span>
                  <span className="right-align-child">
                      {!isMore[0] ? <AiFillCaretRight /> : <AiFillCaretDown />}
                    </span>
                </div>
                {isMore[0]
                                    && (
                                    <div>
                                      <div className="d-flex justify-content-end">
                                        <div className="p-2 mb-2 border sub-menu-item">
                                          <span>アカウント</span>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-end">
                                        <div className="p-2 mb-2 border sub-menu-item">
                                          <span>収益</span>
                                        </div>
                                      </div>
                                    </div>
                                    )}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div style={{ width: '90%' }}>
                <div className="p-2 mb-2 border right-align-parent menu-item" onClick={() => handleExpand(1)}>
                  <span className="fw-bold">マネジメント</span>
                  <span className="right-align-child">
                      {!isMore[1] ? <AiFillCaretRight /> : <AiFillCaretDown />}
                    </span>
                </div>
                {isMore[1]
                                    && (
                                    <div>
                                      <div className="d-flex justify-content-end">
                                        <div className="p-2 mb-2 border sub-menu-item">
                                          <span>カスタマー</span>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-end">
                                        <div className="p-2 mb-2 border sub-menu-item">
                                          <span>ドライバー</span>
                                        </div>
                                      </div>
                                    </div>
                                    )}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div style={{ width: '90%' }}>
                <Link to="/admin/driver-requests" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <div className="p-2 mb-2 border menu-item">
                      <span className="fw-bold text-dark">ドライバーの承認</span>
                    </div>
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div style={{ width: '90%' }}>
                <div className="p-2 mb-2 border menu-item">
                  <span className="fw-bold">割引管理</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ width: '80%' }}>
          {props.children}
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
