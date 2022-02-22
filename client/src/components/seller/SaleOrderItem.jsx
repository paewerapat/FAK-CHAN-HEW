import moment from 'moment'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateOrderSale } from '../../redux/actions/orderAction'

const SaleProductOrder = ({orderData, images}) => {

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch();

    const handleAccept = (e) => {
        const data = {
            values: e,
            sale_id: orderData.sale_id,
            buyer_id: orderData.buyer_id
        }
        dispatch(updateOrderSale({data, auth, socket}))
    }

    return (
        <div className="col-lg-5">

            <div className="row bg-light justify-content-center rounded mb-1 p-2 gap-1">
                <div className="col-md-4 text-center my-2" >
                    <img src={images[0].url}
                        className="img-fluid image_product_list" alt="product_list" />
                </div>
                <div className="col-md-7 my-2">
                    <h4>
                        <span className={`badge bg-${orderData.order_status === 'รอการตอบรับ' ? 'secondary'
                         : orderData.order_status === 'ที่ต้องจัดส่ง' ? 'warning' : 'success'}`}>
                            สถานะ: {orderData.order_status}
                        </span>
                    </h4>

                    <h5 className='fw-bold'>ออเดอร์ #{orderData.order_id}</h5>
                    <h6>ชื่อสินค้า: {orderData.salename}</h6>
                    <h6>ผู้สั่งซื้อ: {orderData.buyer_id}</h6>
                    <h5><span className="badge bg-primary">จำนวน: {orderData.quantity} ชิ้น</span></h5>
                    <h5><span className="badge bg-success">ยอดรวม: {orderData.total}฿</span></h5>
                    <p className='text-end'>อัพเดท: {moment(orderData.updated).fromNow()}</p><hr/>

                    <div className="d-grid gap-2 d-md-flex justify-content-center">
                        <button type="button" className='btn btn-outline-secondary'>
                            ดูรายละเอียด
                        </button>

                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                อัพเดทสถานะ
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{cursor: 'pointer'}}>
                                {
                                    orderData.order_status === 'รอการตอบรับ' &&
                                    <li>
                                        <span className="dropdown-item"
                                        onClick={() => handleAccept('เตรียมจัดส่ง')}>
                                            รับออเดอร์
                                        </span>
                                    </li>
                                }
                                {
                                    orderData.order_status === 'เตรียมจัดส่ง' &&
                                    <li>
                                        <span className="dropdown-item"
                                        onClick={() => handleAccept('จัดส่งแล้ว')}>
                                            จัดส่งแล้ว
                                        </span>
                                    </li>
                                }
                                <li><hr className="dropdown-divider" /></li>
                                <li><span className="dropdown-item bg-danger text-light">ยกเลิกออเดอร์</span></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleProductOrder
