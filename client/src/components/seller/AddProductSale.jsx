import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { createProductSale, updateProductSale } from '../../redux/actions/productSaleAction'
import AddCategoryModal from '../AddCategoryModal'
import AddProductModal from '../AddProductModal'

const AddProductSale = () => {

    const { auth, allCategories, allProducts, updateStatus } = useSelector(state => state)
    const [images, setImages] = useState([])
    const dispatch = useDispatch();

    const initState = {
        seller_id: auth.user.villagers_id, product_id: '', category_id: '',salename: '', price: '', inventories: '', status: 'มีสินค้า', description: ''
    }

    const [saleData, setSaleData] = useState(initState)
    const { product_id, salename, price, inventories, description, category_id } = saleData

    const changeImages = (e) => {
        const files = [...e.target.files];
        let err = ""
        let newImages = []

        files.forEach(file => {
            if(!file) return err = "ไม่มีไฟล์ที่คุณเลือก!"
            if(file.size > 1920 * 1080 * 5) return err = "ไฟล์รูปภาพของคุณใหญ่กว่า 5 mb."

            return newImages.push(file)
        })
        if(err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: {error: err}
        })
        setImages([...images, ...newImages])
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setSaleData({...saleData, [name]:value })
    }

    const handleDeleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(updateStatus.onEdit){
            await dispatch(updateProductSale({saleData, auth}))
        } else {
            if(images.length === 0) return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "กรุณาเพิ่มรูปภาพสินค้าขาย!"}})
            await dispatch(createProductSale({saleData, images, auth}))
        }
        setSaleData(initState)
        setImages([])
    }

    useEffect(() => {
        if(updateStatus.onEdit){
            setSaleData(updateStatus)
        }
    }, [updateStatus])

    return (
        <div className="container mt-5">
            <h3 className='text-center'>
                <i className="fas fa-store text-primary"/>&nbsp;
                {updateStatus.onEdit ? `อัพเดตข้อมูล #${updateStatus.sale_id}` : 'เพิ่มสินค้าขาย'}
            </h3>
            <h6 className="text-center">ระบุข้อมูลการลงขายสินค้าต่างๆให้ตรงกับความเป็นจริง</h6>
            <hr className="w-50 mx-auto"/>

            <form className="row col-md-9 mx-auto mt-4" onSubmit={handleSubmit}>
                <div className='mx-auto mb-3'>

                    <input type="text" className='form-control mb-2' placeholder='ชื่อการขายสินค้า' required 
                    onChange={handleInput} name="salename" value={salename}/>
                    <textarea className='form-control mb-3' placeholder='คำอธิบายสินค้า ไม่เกิน 255 ตัวอักษร' required
                    onChange={handleInput} name="description" value={description} />

                    {
                        !updateStatus.onEdit &&
                        <>
                        <div className="d-flex mb-2">
                            <select className="form-select" aria-label="Default select example" required
                            onChange={handleInput} value={product_id} name="product_id">
                                <option selected>เลือกสินค้า</option>
                                {
                                    allProducts.products.map(item => (
                                        <>
                                        <option key={item.product_id} value={item.product_id}>
                                            {item.product_name}: ~{item.product_price}฿
                                        </option>
                                        </>
                                    ))    
                                }
                            </select>
                            <button type="button" className='btn btn-sm btn-primary col-md-3'
                            data-bs-toggle="modal" data-bs-target="#addProductModal"
                            >
                                <i className="fas fa-plus"/> เพิ่มสินค้า
                            </button>
                        </div>

                        <div className="d-flex mb-3">
                            <select className="form-select" aria-label="Default select example"
                            value={category_id} name="category_id" onChange={handleInput}>
                                <option selected>เลือกหมวดหมู่การขาย</option>
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
                                <i className="fas fa-plus"/> เพิ่มหมวดหมู่
                            </button>
                        </div>
                        </>
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group mb-2">
                                <input type="number" className='form-control' placeholder='ระบุราคาขายสินค้า' 
                                onChange={handleInput} value={price} name="price" />
                                <span className="input-group-text">บาท</span>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <input type="number" className='form-control' placeholder='ระบุจำนวนสินค้า' 
                                onChange={handleInput} value={inventories} name="inventories" />
                                <span className="input-group-text">ชิ้น</span>
                            </div>
                        </div>
                    </div>
                    
                    {
                        updateStatus.onEdit
                        ? <small className="text-center text-danger">**คุณไม่สามารถแก้ไขรูปภาพได้ เพื่อป้องกันการปรับเปลี่ยนระหว่างการขาย</small>
                        :
                        <>
                        <h6>ภาพถ่ายสินค้า</h6>
                        <input type="file" name="file" className='form-control' multiple
                        id="file_up" accept="image/*" onChange={changeImages}/>
                        <small className="text-end">ขนาดไฟล์ภาพต้องไม่ใหญ่กว่า 1920*1080 | Support .png/.jpeg</small>
                        </>
                    }
                </div>
            
                {
                    !updateStatus.onEdit &&
                    <div className="d-flex show_images mb-3">
                    {
                        images.map((image, index) => (
                            <div key={index}>
                                <img src={URL.createObjectURL(image)} 
                                    className="rounded img-thumbnail m-1" alt="image_product" 
                                    style={{maxHeight: '150px'}}
                                />
                                <span onClick={() => handleDeleteImages(index)}>&times;</span>
                            </div>
                        ))
                    }
                    </div>
                }

                <div className="d-grid gap-2 mt-4 col-md-6 mx-auto">
                    {
                        updateStatus.onEdit
                        ?
                        <button type="submit" className="btn btn-success btn-block"><i className="far fa-check-circle"/> อัปเดตข้อมูล</button>
                        :
                        <button type="submit" className="btn btn-success btn-block"><i className="far fa-check-circle"/> ลงขายสินค้า</button>
                    }
                    <button type="reset" className="btn btn-secondary btn-block "><i className="fas fa-undo"/> รีเซ็ตข้อมูล</button>
                </div>

            </form>

            <AddProductModal />
            <AddCategoryModal />
            
        </div>
    )
}

export default AddProductSale
