import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import MapLeaflet from '../MapLeaflet'
import moment from 'moment'
import { acceptInvoice } from '../../redux/actions/invoiceAction'

const InvoiceDetail = () => {

    const { auth, socket } = useSelector(state => state)
    const params = useParams()
    const dispatch = useDispatch()
    const [invoiceData, setInvoiceData] = useState([])
    const [productItems, setProductItems] = useState([])

    useEffect(() => {
        if(params.id){
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
            getDataAPI(`invoice/${params.id}`)
            .then(res => {
                setInvoiceData(res.data.invoice)
                setProductItems(JSON.parse(res.data.invoice.product_items))
                dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
            }).catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
        }
    }, [dispatch, params.id])

    const handleAcceptInvoice = () => {
        if(auth.user.role === 1 || auth.user.role === 2){
            if(window.confirm("คุณยืนยันที่จะรับใบฝากซื้อนี้ไหม?")){
                const data = {
                    rider_id: auth.user.villagers_id,
                    invoice_id: invoiceData.invoice_id,
                    client_id: invoiceData.client_id
                }
                dispatch(acceptInvoice({data, auth, socket}))
            }
        } else {
            dispatch({type: GLOBALTYPES.ALERT, payload: {warning: "คุณยังไม่มีสิทธิ์ในการใช้งาน!"}})
        }
    }

    return (
        <div className="container my-5 p-md-4 col-md-9 card">
            <div className="row justify-content-between">

                <div className="col-lg-7 py-2">
                    <MapLeaflet locationName={invoiceData.location_name} lat={invoiceData.latitude} long={invoiceData.longitude} />
                </div>

                <div className="col-lg-5 py-2 text-md-center">
                    <h4 className="fw-bold">สถานที่: {invoiceData.location_name}</h4>
                    <h4><Link to={`/profile/${invoiceData.client_id}`}>
                    <span className="badge bg-success">ผู้ฝากซื้อ: {invoiceData.client_id}</span>
                    </Link></h4>
                    <h6>รายละเอียดเพิ่มเติม: <br/>{invoiceData.description}</h6>
                    <h6 className="my-3 text-center">รายการสินค้า<br/>
                        {
                            productItems.map(item => (
                                <ul className="list-group" key={item.product_id}>
                                    <li className="list-group-item d-flex justify-content-between">
                                        {item.product_name} <span>{item.product_price} บาท</span>
                                        <span className="badge rounded-pill bg-primary">{item.amount} ชิ้น</span>
                                    </li>
                                </ul>
                            ))
                        }
                    </h6>
                    <h5 className="text-end"><span className="badge bg-primary">รวมค่าสินค้าทั้งหมด: {invoiceData.estimated_cost} บาท</span></h5>
                    <h5 className="text-end">
                        <span className="badge bg-danger">
                        จัดส่งภายใน: {moment(invoiceData.desired_time).format('MMM d, YYYY, h:mm:ss a')}
                            </span>
                    </h5>
                    <hr/>
                    <div className="d-grid">
                        <button type="button" className="btn btn-success" onClick={handleAcceptInvoice}>
                        <i className="fas fa-check-circle"/> รับฝากซื้อ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetail
