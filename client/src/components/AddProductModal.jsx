import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { createProduct } from '../redux/actions/productAction';
import { imageCheck } from '../utils/imageUpload';


const AddProductModal = () => {

    const { auth, allCategories } = useSelector(state => state)
    const dispatch = useDispatch();
    const [images, setImages] = useState(null)

    const initState = {
        product_name: '', product_price: '', category_id: ''
    }

    const [productData, setProductData] = useState(initState)
    const { product_name, product_price, category_id } = productData

    const handleInput = e => {
        const {name, value} = e.target
        setProductData({...productData, [name]:value})
    }

    const handleChangeImages = (e) => {
        if(!e.target.files[0]) return dispatch({
            type: GLOBALTYPES.ALERT, payload: {warning: 'กรุณาเลือกรูปภาพ!'}
        })
        const file = e.target.files[0]
        const err = imageCheck(file)
        if(err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: {warning: err}
        })
        setImages(file)
    }

    const handleDeleteImages = () => {
        setImages(null)
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createProduct({productData, images, auth}))
    }

    return (

        <div className="modal fade" id="addProductModal" tabIndex={-1}>
            <form className="modal-dialog" onSubmit={handleSubmit}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            เพิ่มสินค้า <i className="fas fa-question-circle text-primary"/> 
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        {/* ----------Product Input------------- */}
                        <small>ระบุชื่อสินค้า/หน่วยสินค้า</small>
                        <input type="text" className='form-control mb-2' placeholder='เช่น อกไก่ 1 กก. /  หัวหอม 1 ขีด' required
                        name="product_name" value={product_name} onChange={handleInput}/>
                        <div className="d-flex mb-2">
                            <select class="form-select" aria-label="Default select example" required
                            onChange={handleInput} value={category_id} name="category_id">
                                <option selected>กรุณาเลือกหมวดหมู่สินค้า</option>
                                {
                                    allCategories.category.map(item => (
                                        <option key={item.category_id} value={item.category_id}>
                                            {item.category_name}
                                        </option>
                                    ))
                                }
                            </select>
                            <button type="button" className='btn btn-sm btn-primary col-md-3'
                            data-bs-toggle="modal" data-bs-target="#addCategoryModal"
                            >
                                <i className="fas fa-plus"/> หมวดหมู่ใหม่
                            </button>
                        </div>
                        <small>ราคากลางหรือราคาท้องตลาด</small>
                        <div className="input-group mb-2">
                            <input type="number" className='form-control' placeholder='50' required
                            name="product_price" value={product_price} onChange={handleInput}/>
                            <span className='input-group-text'>บาท</span>
                        </div>
                        <small>รูปภาพตัวอย่างสินค้า</small>
                        <input type="file" className="form-control" name="file" accept='image/*' required
                        onChange={handleChangeImages} />

                        {
                            images &&
                            <div className="show_images m-3 text-center">
                                <img src={URL.createObjectURL(images)} alt="product_images" 
                                className="rounded img-thumbnail" style={{maxHeight: '150px'}} />
                                <span onClick={() => handleDeleteImages()}>&times;</span>
                            </div>
                        }

                    </div>
                    <div className="modal-footer">
                        <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">
                            <i className="fas fa-undo"/> ปิด
                        </button>
                        <button type="submit" className="btn btn-success" data-bs-dismiss="modal"
                        >
                            <i className="fas fa-share"/> เพิ่มสินค้า
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default AddProductModal
