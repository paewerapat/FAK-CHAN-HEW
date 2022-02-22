import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { updateBuyOrderStatus } from '../../redux/actions/orderAction'

const BuyOrderItem = ({orderData, images}) => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const updateBuyOrder = () => {
        if(window.confirm("คุณตรวจสอบสินค้าและรับสินค้าเรียบร้อยแล้ว?")){
            dispatch(updateBuyOrderStatus(auth.token))
        }
    }

    return (
        <div className="container mt-2 col-md-9">
            <div className="row gap-2 bg-light justify-content-center">
                <div className="col-md-4 text-center my-2" >
                    <img src={images.url}
                        className="img-fluid image_product_list" alt="product_list" />
                </div>
                <div className="col-md-6 my-2">
                    <h5 className='fw-bold'>รหัสออเดอร์ #{orderData.sale_id}</h5>
                    <h6>ชื่อสินค้า: {orderData.salename}</h6>
                    <h6>รายละเอียด: {orderData.description}</h6>
                    <h5><span className="badge bg-success">ยอดรวม: {orderData.total}฿</span></h5>
                    <h6>จำนวน: {orderData.quantity} ชิ้น</h6>
                    <p className='text-end'>สั่งซื้อเมื่อ: {moment(orderData.OrderDate).fromNow()}</p><hr/>
                    <div className="d-grid gap-2 d-md-flex justify-content-center">
                        <button type="button" className='btn btn-outline-secondary'>
                            <Link to={`/product-sale/${orderData.sale_id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                ดูสินค้า
                            </Link>
                        </button>
                        <button type="button" className='btn btn-warning'
                        onClick={updateBuyOrder}>
                            ตรวจสอบและรับสินค้าแล้ว
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyOrderItem
