import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const InvoiceRequestItem = ({invoiceData, productItems}) => {
    return (
        <div className="col-md-5 m-1">

            <div className="row bg-light justify-content-center rounded mb-1 p-2 gap-1">
                <div className="col-md-5 text-center py-md-2" >
                    <img src={JSON.parse(productItems[0].images).url}
                        className="img-fluid image_product_list" alt="product_list" />
                </div>

                <div className="col-md-6 py-md-2 text-center">
                    <h5 className="fw-bold text-danger">สถานที่: {invoiceData.location_name}</h5>
                    <h4><span className="badge bg-success">ค่าใช้จ่าย: {invoiceData.total}฿</span></h4>
                    <h6>รายการสินค้า: {productItems.length} รายการ</h6>
                </div>
                <hr/>
                <h6>รายละเอียดเพิ่มเติม: <br/> {invoiceData.description}</h6>
                <h6 className="text-end">จัดส่งภายใน: <br/>
                    <div className="fw-bolder">
                        {moment(invoiceData.desired_time).format('MMM d, YYYY, h:mm:ss a')}
                    </div>
                </h6>
                <div className="d-flex justify-content-end">
                    <Link to={`/invoice-request/${invoiceData.invoice_id}`}><button type="button" className='btn btn-outline-secondary'>ดูรายละเอียด</button></Link>
                </div>
            </div>

        </div>
    )
}

export default InvoiceRequestItem
