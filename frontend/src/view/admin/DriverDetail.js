import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./driver_detail.css";

function DriverDetail() {
    const { id } = useParams();
    const [driver, setDriver] = useState({});
    const { register, handleSubmit } = useForm();
    const nav = useNavigate();
    
    const getDriverDetail = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/drivers/${id}/inactive`)
            .then((res) => {
                console.log(res.data);
                setDriver(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSubmit = async ({ isAccept }) => {
        if (window.confirm('変更を保存しますか？')) {
            const data = {
                isAccept: isAccept,
                id: driver.id
            }
            await axios
                .post("http://127.0.0.1:8000/api/drivers/process-signup-request", data)
                .then((res) => {
                    console.log(res.data);
                    nav('/admin/driver-requests')
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            nav('/admin/driver-requests')
        }
    }

    useEffect(() => {
        getDriverDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminLayout page_title="TaJa_ドライバー_承認_詳細">
            <div className="row mt-3">
                <div className="col-sm-8"></div>
                <div className="col-sm-3">
                    <div className="border text-center py-1 shadow title">
                        <span className="fw-bold" style={{ fontSize: '20px' }}>詳細</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="mt-5 col-sm-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="table table-borderless" style={{ fontWeight: 'normal' }}>
                            <tbody>
                                <tr>
                                    <th style={{ width: '20%' }}>氏名</th>
                                    <td style={{ width: '40%' }}>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.name}
                                        </div>
                                    </td>
                                    <td rowSpan="7">
                                        <div className="d-flex flex-column align-items-center">
                                            <img className="" src="https://photocross.net/wp-content/uploads/2020/03/bo-cuc-chup-anh-chan-dung.jpg" alt="h1" style={{ maxWidth: '70%' }} />
                                            <div className="mt-1 fw-bold" style={{ fontSize: '14px' }}>
                                                肖像写真
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>性別</th>
                                    <td>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.gender === 0 ? '男性' : '女性'}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>メール</th>
                                    <td>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.email}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>電話番号</th>
                                    <td>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.phone}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>住所</th>
                                    <td>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.address}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>レベル</th>
                                    <td>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.level}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>ナンバープレート</th>
                                    <td>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.first_veh_plate}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>車両種類</th>
                                    <td>
                                        <div className="border ps-2 py-1 infor-cell">
                                            {driver.first_veh_type}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>状態</th>
                                    <td>
                                        <select className="form-select rounded-0 select-cell" {...register('isAccept')}>
                                            <option value="1">アクティブ</option>
                                            <option value="2">デニー</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary mt-4 ms-3">セーブ</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default DriverDetail;