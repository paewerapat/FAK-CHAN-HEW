import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ProductSaleItem = ({saleProduct, images}) => {

    return (
        <div className="col-md-5 m-1">

            <div className="row bg-light justify-content-center rounded mb-1 p-2 gap-1">
                <div className="col-md-5 text-center py-md-2" >
                    <img src={images[0].url}
                        className="img-fluid image_product_list" alt="product_list" />
                </div>
                <div className="col-md-6 text-center py-md-2">
                    <h5 className="fw-bold text-danger">{saleProduct.salename}</h5>
                    <h4><span className="badge bg-success">ราคา: {saleProduct.price}฿</span></h4>
                    <h6>สินค้าคงเหลือ: {saleProduct.inventories}</h6>
                </div>
                <hr/>
                <h6>รายละเอียดสินค้า: <br/>{saleProduct.description}</h6>
                <h6 className='text-end'>อัพเดท: {moment(saleProduct.updated).fromNow()}</h6>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" className='btn btn-outline-secondary'>
                        <Link to={`/product-sale/${saleProduct.sale_id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                            ดูรายละเอียด
                        </Link>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProductSaleItem
