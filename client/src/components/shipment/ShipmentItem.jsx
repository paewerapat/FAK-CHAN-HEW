import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { alreadyShipped } from '../../redux/actions/invoiceAction'

const ShipmentItem = ({myShipment, productItems, auth, socket}) => {

    const dispatch = useDispatch()
    const handleShipped = () => {
        if(window.confirm('คุณแน่ใจว่ายืนยันการจัดส่งเรียบร้อยแล้ว?')){
            dispatch(alreadyShipped({myShipment, auth, socket}))
        }
    }

    return (
        <div className="container col-md-9 mt-2">
            <div className="row gap-2 bg-light rounded align-items-center justify-content-center">
                <div className="col-md-4 text-center m-3" >
                    <img src={JSON.parse(productItems[0].images).url}
                        className="img-fluid image_product_list" alt="product_list" />
                </div>

                <div className="col-md-6 m-3">
                    <h5 className="fw-bold text-danger">สถานที่: {myShipment.location_name}</h5>
                    <h4><span className="badge bg-success">ค่าใช้จ่าย: {myShipment.total}฿</span></h4>
                    <h5><span className="badge bg-info">จำนวนสินค้า: {productItems.length} ชิ้น</span></h5>
                    <h6>จัดส่งภายใน: <br/>{moment(myShipment.desired_time).format('MMM d, YYYY, h:mm:ss a')}</h6>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" className='btn btn-outline-secondary'>
                            <Link to={`/invoice-request/${myShipment.invoice_id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                ดูรายละเอียด
                            </Link>
                        </button>
                        <button type="button" className="btn btn-warning" onClick={handleShipped}>
                        <i className="fas fa-check-circle"/> ยืนยันการจัดส่งแล้ว
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ShipmentItem
