import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import AddProductByLocation from '../AddProductByLocation'
import AddProductModal from '../AddProductModal'
import AddLocationModal from '../AddLocationModal'
import AddCategoryModal from '../AddCategoryModal'
import { createInvoice } from '../../redux/actions/invoiceAction'

const AddInvoice = () => {

    const { auth, allLocation, allProductByLocation, allProducts, services } = useSelector(state => state)
    const dispatch = useDispatch()
    const [invoiceList, setInvoiceList] = useState([])
    const [location_id, setLocation_id] = useState("")
    const [total, setTotal] = useState("")

    const initialState = {
        product_by_location_id: '', client_id: auth.user.villagers_id,  estimated_cost: '', desired_time: '', description: '', product_items: ''
    }

    const [invoiceData, setInvoiceData] = useState(initialState)
    const { product_by_location_id, description, estimated_cost, desired_time} = invoiceData
    const distance = allLocation.location.find(item => item.location_id === Number(location_id))

    const handleInput = (e) => {
        const { name, value } = e.target
        setInvoiceData({...invoiceData, [name]:value})
    }

    const handleLocation = (e) => {
        setLocation_id(e.target.value)
    }

    const handleAddList = () => {
        if(!product_by_location_id) return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {warning: "กรุณาเลือกสินค้าตามสถานที่ก่อน!"}
        })
        // Data of Product By Location
        const productByLocation = allProductByLocation.productByLocation.filter(item => 
            item.product_by_location_id === Number(product_by_location_id)    
        )
        // Check product
        const invoice = invoiceList.filter(item => 
            item.product_id === Number(productByLocation[0].product_id)
        )
        if(invoice.length > 0) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {warning: "คุณเพิ่มสินค้านี้ไปแล้ว!"}
            })
        }
        // Add new List
        const productName = allProducts.products.filter(item => 
            item.product_id === Number(productByLocation[0].product_id)
        )
        if(productName.length > 0) setInvoiceList([productName[0], ...invoiceList])
    }

    const handleChangeList = (e, id) => {
        setInvoiceList(invoiceList.map(item => 
            item.product_id === id
            ? {...item, amount: e.target.value}
            : item
        ))
    }

    const handleDeleteList = (index) => {
        const newArr = [...invoiceList]
        newArr.splice(index, 1)
        setInvoiceList(newArr)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {...invoiceData, product_items: JSON.stringify(invoiceList), total: total}
        dispatch(createInvoice({data, auth}))
        setInvoiceData(initialState)
        setInvoiceList([])
        setTotal("")
    }

    useEffect(() => {
        if(estimated_cost){
            setTotal(Number(estimated_cost) + Number(distance.service_charge) + Number(services.service_charge))
        }
    }, [estimated_cost])

    return (
        <div className="container mt-5">
            <h3 className='text-center'><i className="fas fa-sticky-note text-primary"/> เพิ่มใบฝากซื้อ</h3>
            <h6 className='text-center'>กรุณาระบุรายละเอียดต่างๆให้ครบถ้วน เพื่อความถูกต้องของผู้รับฝากซื้อและตนเอง</h6>
            <hr className="w-50 mx-auto" />

            <form className="row mt-4" onSubmit={handleSubmit}>
                <div className='col-md-9 mx-auto'>

                    <div className="d-flex mb-2">
                        <select className="form-select" name="location_id" disabled={invoiceList.length > 0 ? 'disabled' : ''}
                        value={location_id} onChange={handleLocation} required>
                            <option selected>สถานที่ซื้อสินค้า</option>
                            {
                            allLocation.location.map(item => (
                                <option key={item.location_id} value={item.location_id}>
                                    {item.location_name} | ค่าบริการ: {item.service_charge} บาท
                                </option>
                            ))
                            }
                        </select>

                        <button className="btn btn-sm btn-primary col-md-2" type="button"
                        data-bs-toggle="modal" data-bs-target="#addLocationModal">
                        <i className="fas fa-plus"/> สถานที่ซื้อ
                        </button>
                    </div>

                    <div className="d-flex mb-3">
                        <select className="form-select" name="product_by_location_id" required
                        value={product_by_location_id} onChange={handleInput}>
                            <option selected>สินค้าตามสถานที่</option>
                            { location_id &&
                                allProductByLocation.productByLocation.filter(items => items.location_id === Number(location_id))
                                .map(item => (
                                    <option key={item.product_by_location_id} value={item.product_by_location_id}>
                                        {item.product_name}
                                    </option>
                                    )
                                )
                            }
                        </select>
                        <button class="btn btn-sm btn-primary col-md-2" type="button"
                        data-bs-toggle="modal" data-bs-target="#addProductByLocationModal">
                        <i className="fas fa-plus"/> สินค้าตามสถานที่
                        </button>
                    </div>
                </div>

                <small className="text-center mb-1">*กรุณาเลือกสินค้าตามสถานที่ก่อนแล้วกดเพิ่มลงรายการ</small>
                <div className="d-flex justify-content-center mb-3">
                    <button className="btn btn-sm btn-outline-success" onClick={handleAddList}
                    type="button">
                        <i className="fas fa-arrow-circle-down"/> เพิ่มสินค้าลงรายการฝากซื้อ
                    </button>
                </div>
                    <hr className="w-50 mx-auto" />

                <div className="col-md-8 mx-auto mb-3">
                    {
                        invoiceList.length > 0 ?
                        <>
                        <div className="list-group">
                        <h4 className="text-center"><span className="badge bg-success">รายการใบฝากซื้อ</span></h4>
                            {invoiceList.map((item, index) => (
                                    <span className="list-group-item list-group-item-action flex-column" key={index}>
                                        <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1 fw-bolder">#{index} {item.product_name}</h6>
                                        <h6 style={{cursor: 'pointer'}}><span className="badge bg-danger" onClick={() => handleDeleteList(index)}>
                                            X
                                            </span>
                                        </h6>
                                        </div>
                                        <div className="d-flex w-100 justify-content-between  align-items-center">
                                            <img src={JSON.parse(item.images).url} alt="invoice_list" className="thumb-nail" 
                                            style={{maxHeight: '60px'}}/>
                                            <h6>ราคา: {item.product_price}฿</h6>
                                            <input type="number" className="form-control w-25" placeholder="จำนวน" required
                                            value={item.amount} onChange={(e) => handleChangeList(e, item.product_id)}/>
                                        </div>
                                    </span>
                                ))
                            }
                        </div>
                        </>
                        :
                        <h6 className="text-center text-primary">คุณยังไม่ได้เพิ่มสินค้าลงรายการ</h6>
                    }
                </div>

                <div className="col-md-9 mx-auto">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">วัน/เวลา ที่ต้องการสินค้า</label>
                            <input type="datetime-local" id="birthdaytime" name="desired_time" className='form-control mb-3' required
                            value={desired_time} onChange={handleInput} />
                        </div>
                        <div className="col-md-6">
                            <label for="basic-url" className="form-label">ค่าใช้จ่ายสำหรับสินค้าโดยประมาณ</label>
                            <div className="input-group">
                                <input type="number" className='form-control' placeholder="ตัวอย่างเช่น 339" required
                                name="estimated_cost" value={estimated_cost} onChange={handleInput} />
                                <span class="input-group-text" id="basic-addon1">บาท</span>
                            </div>
                            <small>ค่าบริการเบื้องต้น: +{services.service_charge} บาท</small>
                        </div>
                    </div>

                    <div className="row col-md-7 mx-auto my-3">
                        {
                            estimated_cost &&
                            <>
                            <h4 className="text-center"><span className="badge bg-danger">ค่าใช้จ่ายทั้งหมด</span></h4>
                                <ul className="list-group mb-3 fs-6">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        ค่าสินค้า: <span>{estimated_cost} บาท</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        + ค่าบริการตามระยะทาง: <span>{distance.service_charge} บาท</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        + ค่าชาร์จเริ่มต้น: <span>{services.service_charge} บาท</span>
                                    </li>
                                    <li className="list-group-item active d-flex justify-content-between align-items-center fw-bolder">
                                        รวมทั้งสิ้น: 
                                        <span>{total} บาท</span>
                                    </li>
                                </ul>
                                </>
                        }
                    </div>

                    <label className="form-label">รายละเอียดเพิ่มเติม</label>
                    <textarea type="text" value={description} name="description" onChange={handleInput} className='form-control mb-3'
                    placeholder='ตัวอย่างเช่น 1.เนื้อหมู 1 กิโล 240 บาท 2.ไข่ไก่ 1 แผง 99 บาท'/>

                    <div className="d-grid gap-2 mt-4 mx-auto col-md-6">
                        <button type="submit" className="btn btn-success btn-block">ลงใบฝากซื้อ</button>
                        <button type="reset" className="btn btn-secondary btn-block">รีเซ็ตข้อมูล</button>
                    </div>
                </div>

            </form>
            <AddProductByLocation />
            <AddProductModal />
            <AddCategoryModal />
            <AddLocationModal />
        </div>
    )
}

export default AddInvoice
