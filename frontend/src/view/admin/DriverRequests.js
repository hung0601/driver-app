import { Link } from 'react-router-dom';
import {
  AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineEye, AiOutlineLeft, AiOutlineRight,
} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './driver_requests.css';

function DriverRequests() {
  const [driverList, setDriverList] = useState([{}]);
  const [drivers, setDrivers] = useState([{}]);
  const per_page = 10;
  const [totalRecord, setTotalRecord] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  const getAllDrivers = async () => {
    await axios
      .get('http://127.0.0.1:8000/api/drivers/signup-requests')
      .then((res) => {
        // console.log(res.data.length);
        setDriverList(res.data);
        setDrivers(res.data.slice(0, 10));
        setTotalRecord(res.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFilter = async (e) => {
    // console.log(e.target.value)
    const level = e.target.value;
    await axios
      .get(`http://127.0.0.1:8000/api/drivers/signup-requests?level=${level}`)
      .then((res) => {
        setDriverList(res.data);
        setDrivers(res.data.slice(0, 10));
        setTotalRecord(res.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePageRedirect = (page) => {
    console.log(`page: ${page}`);
    if (page >= 1 && page <= totalPage) {
      let lastRecord = 0;
      const firstRecord = page * per_page - (per_page - 1);
      lastRecord = page * per_page;

      setDrivers(driverList.slice(firstRecord - 1, lastRecord));
      setCurPage(page);
    }
  };

  useEffect(() => {
    if (totalRecord % per_page === 0) {
      setTotalPage(totalRecord / per_page)
    } else {
      setTotalPage(Math.floor(totalRecord / per_page + 1));
    }
  }, [totalRecord]);

  useEffect(() => {
    getAllDrivers();
  }, []);

  function PaginationBar({ numPage }) {
    const items = [];
    for (let i = 1; i <= numPage; i++) {
      items.push(
        <li className="page-item" key={i}>
          <button className="page-link" onClick={() => handlePageRedirect(i)}>
            {i}
          </button>
        </li>,
      );
    }

    return (
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageRedirect(1)}>
            <AiOutlineDoubleLeft />
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageRedirect(curPage - 1)}>
            <AiOutlineLeft />
          </button>
        </li>
        {items}
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageRedirect(curPage + 1)}>
            <AiOutlineRight />
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => handlePageRedirect(totalPage)}>
            <AiOutlineDoubleRight />
          </button>
        </li>
      </ul>
    );
  }

  return (
    <AdminLayout page_title="TaJa_ドライバー_承認">
      <div className="row mt-3">
        <div className="col-sm-8" />
        <div className="col-sm-3 border text-center py-1 shadow title">
          <span className="fw-bold" style={{ fontSize: '20px' }}>承認</span>
        </div>
      </div>
      <div className="d-flex ms-5">
        <div className="ms-5">
          合計:
          <span className="btn border ms-2 rounded-0" style={{ backgroundColor: '#d6d2d290' }}>
            {totalRecord}
          </span>
        </div>
        <form className="ms-5">
          <div className="d-flex align-items-center">
            <div className="ms-5" />
            <span style={{ minWidth: '90px' }}>フィルたー:</span>
            <select className="form-select rounded-0 border-dark" style={{}} onChange={handleFilter}>
              <option value="">すべて</option>
              <option value="N1">N1</option>
              <option value="N2">N2</option>
              <option value="N3">N3</option>
              <option value="N4">N4</option>
              <option value="N5">N5</option>
            </select>
          </div>
        </form>
      </div>
      <div className="ms-5" style={{ marginTop: '11px' }}>
        <table className="table table-borderless border border-dark text-center ms-5" style={{ maxWidth: '80%', fontSize: '15px' }}>
          <thead>
            <tr className="border-bottom border-dark">
              <th className="border-end border-dark table-header" style={{ width: '15%' }}>序数</th>
              <th className="border-end border-dark table-header" style={{ width: '15%' }}>ドライバーID</th>
              <th className="border-end border-dark table-header" style={{ width: '20%' }}>氏名</th>
              <th className="border-end border-dark table-header" style={{ width: '15%' }}>レベル</th>
              <th className="border-end border-dark table-header" style={{ width: '20%' }}>登録日</th>
              <th className="border-end border-dark table-header" style={{ width: '15%' }}>詳細</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((item, index) => (
              <tr className="" key={index}>
                <td className="border border-dark border-top-0 border-bottom-0 table-cell">
                  <div className="pt-1" style={{ width: '98%' }}>
                    {index + 1 + per_page * (curPage - 1)}
                  </div>
                </td>
                <td className="border border-dark border-top-0 border-bottom-0 table-cell">
                  <div className="pt-1" style={{ width: '98%' }}>
                    {item.id}
                    {' '}
                  </div>
                </td>
                <td className="border border-dark border-top-0 border-bottom-0 table-cell">
                  <div className="pt-1" style={{ width: '98%' }}>{item.name}</div>
                </td>
                <td className="border border-dark border-top-0 border-bottom-0 table-cell">
                  <div className="pt-1" style={{ width: '98%' }}>{item.level}</div>
                </td>
                <td className="border border-dark border-top-0 border-bottom-0 table-cell">
                  <div className="pt-1" style={{ width: '98%' }}>{item.signup_date}</div>
                </td>
                <td className="table-cell">
                  <div className="" style={{ width: '98%', fontSize: '20px' }}>
                    <Link to={`/admin/drivers/${item.id}`}>
                      <AiOutlineEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ width: '80%' }}>
          <PaginationBar numPage={totalPage} />
        </div>
      </div>
    </AdminLayout>
  );
}
export default DriverRequests;
