import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { deleteProductSale, outStockProductSale } from '../../redux/actions/productSaleAction'

const ProductSaleItem = ({saleData, images, auth}) => {

    const dispatch = useDispatch()

    const handleUpdate = () => {
        dispatch({
            type: GLOBALTYPES.STATUS_PRODUCT,
            payload: {...saleData, onEdit: true}
        })
    }

    const handleDeleteProductSale = () => {
        dispatch(deleteProductSale({saleData, images, auth}))
    }

    const handleOutOfStock = () => {
        dispatch(outStockProductSale({saleData, auth}))
    }

    return (
        <div className="container mt-3 col-md-9">

            <div className="row bg-light rounded my-2 py-2 align-items-center">
                <div className="col-md-4 text-center my-2" >
                    <img src={images[0].url}
                        className="img-fluid image_product_list" alt="product_list" />
                </div>
                <div className="col-md-8 my-2">
                    <h5 className='fw-bold'>รหัสสินค้า #{saleData.sale_id}</h5>
                    <h6>ชื่อสินค้า: {saleData.salename}</h6>
                    <h6>รายละเอียดสินค้า: {saleData.description}</h6>
                    <div className="d-md-flex gap-2">
                        <h5><span className="badge bg-success">ราคา: {saleData.price} บาท</span></h5>
                        <h5><span className="badge bg-primary">คงเหลือ: {saleData.inventories} ชิ้น</span></h5>
                    </div>
                    <p className='text-end'>อัพเดท: {moment(saleData.updated).fromNow()}</p><hr/>

                    <div className="d-flex gap-2 justify-content-center">
                        <button type="button" className='btn btn-outline-secondary'>
                            <Link to={`/product-sale/${saleData.sale_id}`} style={{textdecoration: 'none', color:'inherit'}}>ดูสินค้า</Link>
                        </button>
                        <button type="button" className='btn btn-primary'
                        onClick={handleUpdate}>
                            <Link to={`/add-product-sale`} style={{textdecoration: 'none', color:'inherit'}}>อัพเดทข้อมูล</Link>
                        </button>

                        <div className="dropdown d-flex">
                            <button type="button" className='btn btn-warning dropdown-toggle'
                            id="updateProductSaleItem" data-bs-toggle="dropdown" aria-expanded="false">
                                อัพเดทสถานะ
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="updateProductSaleItem"
                            style={{cursor: 'pointer'}}>
                                <li><span className="dropdown-item text-success">
                                <i className="fas fa-check-circle"/> มีสินค้า
                                    </span>
                                </li>
                                <li><span className="dropdown-item text-secondary" onClick={handleOutOfStock}>
                                <i className="fas fa-times-circle"/> สินค้าหมด
                                    </span>
                                </li>
                                <li><span className="dropdown-item text-danger" onClick={handleDeleteProductSale}>
                                <i className="fas fa-trash"/> ลบสินค้า
                                    </span>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSaleItem
