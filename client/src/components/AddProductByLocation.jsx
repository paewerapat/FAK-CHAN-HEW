import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProductByLocation } from '../redux/actions/productByLocationAction'

const AddProductByLocation = () => {

    const dispatch = useDispatch()
    const { auth, allProducts, allLocation } = useSelector(state => state)
    const initialState = {
        product_id: '', location_id: ''
    }
    const [productByLocation, setProductByLocation] = useState(initialState)
    const { product_id, location_id } = productByLocation

    const handleInput = (e) => {
        const { name, value } = e.target
        setProductByLocation({...productByLocation, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProductByLocation({productByLocation, auth}))
    }

    return (
        <div className="modal fade" id="addProductByLocationModal" tabIndex={-1}>
            <form className="modal-dialog" onSubmit={handleSubmit}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            เพิ่มสินค้าตามสถานที่ <i className="fas fa-question-circle text-primary"/>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">

                        <div className="d-flex mb-2">
                            <select class="form-select"
                            onChange={handleInput} value={product_id} name="product_id">
                                <option selected>กรุณาเลือกสินค้า</option>
                                {
                                    allProducts.products.map(item => (
                                        <option key={item.product_id} value={item.product_id}>
                                            {item.product_name}: ~{item.product_price}฿
                                        </option>
                                    ))
                                }
                            </select>

                            <button className='btn btn-sm btn-primary col-md-3' type="button"
                            data-bs-toggle="modal" data-bs-target="#addProductModal">
                                <i className="fas fa-plus"/> สินค้าใหม่
                            </button>
                        </div>

                        <div className="d-flex mb-2">
                            <select class="form-select"
                            onChange={handleInput} value={location_id} name="location_id">
                                <option selected>กรุณาเลือกสถานที่</option>
                                {
                                    allLocation.location.map(item => (
                                        <option key={item.location_id} value={item.location_id}>
                                            {item.location_name} | {item.distance} km.
                                        </option>
                                    ))
                                }
                            </select>
                            <button class="btn btn-sm btn-primary col-md-2" type="button" 
                            data-bs-toggle="modal" data-bs-target="#addLocationModal" >
                                <i className="fas fa-plus"/> สถานที่
                            </button>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">
                            <i className="fas fa-undo"/> ปิด
                        </button>
                        <button type="submit" className="btn btn-success" data-bs-dismiss="modal"
                        >
                            <i className="fas fa-share"/> เพิ่มสินค้าตามสถานที่
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddProductByLocation
