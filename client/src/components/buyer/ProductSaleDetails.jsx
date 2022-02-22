import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Carousel from '../Carousel'
import moment from 'moment'
import { addOrderBuyProduct } from '../../redux/actions/orderAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { addCart, updateCart } from '../../redux/actions/cartAction'


const SaleProductDetails = () => {

    const { auth, socket, cart } = useSelector(state => state)
    const dispatch = useDispatch()
    const params = useParams()
    const [saleDetails, setSaleDetails] = useState(false)
    const seller = saleDetails.seller_id

    const initialState = {
        sale_id: params.id, quantity: '', buyer_id: '', total: ''
    }

    const [orderData, setOrderData] = useState(initialState)
    const { quantity } = orderData

    useEffect(() => {
        if(params.id){
            getDataAPI(`product-sale/${params.id}`)
            .then(res => {
                setSaleDetails(res.data.result)
            }).catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
        }
    }, [params.id, dispatch])

    useEffect(() => {
        if(auth.user && orderData.quantity){
            setOrderData({...orderData, 
                total: parseInt(orderData.quantity * saleDetails.price),
                buyer_id: auth.user.villagers_id,
            })
        }
    }, [auth.user, orderData.quantity, saleDetails.price])

    const handleInput = (e) => {
        const { name, value } = e.target
        setOrderData({...orderData, [name]:value})
    }

    const handleBuyProduct = async (e) => {
        e.preventDefault();
        if(auth.user){
            if(quantity){
                dispatch(addOrderBuyProduct({orderData, seller, auth, socket}))
                setOrderData(initialState)
            } else {
                dispatch({type: GLOBALTYPES.ALERT, payload: {warning: "กรุณาเลือกจำนวนสินค้า"}})
            }
        } else {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: "คุณไม่ได้เป็นสมาชิก!"}})
        }
    }

    const handleBack = () => {
        window.history.back()
    }

    const handleAddCart = () => {
        if(auth.user){
            if(quantity){
                if(quantity <= saleDetails.inventories){
                    const values = [
                        {
                            seller_id: saleDetails.seller_id,
                            details: [
                                {
                                    ...orderData,
                                    price: saleDetails.price, 
                                    images: JSON.parse(saleDetails.images)[0].url
                                }
                            ]
                        }
                    ]
                    if(cart.myCart !== null && cart.myCart.length > 0) {
                        dispatch(updateCart({values, auth}))
                        setOrderData(initialState)
                    } else {
                        dispatch(addCart({values, auth}))
                        setOrderData(initialState)
                    }
                } else {
                    dispatch({type: GLOBALTYPES.ALERT, payload: {warning: "สินค้ามีไม่เพียงพอ!"}})
                }
            } else {
                dispatch({type: GLOBALTYPES.ALERT, payload: {warning: "กรุณาเลือกจำนวนสินค้า"}})
            }
        } else {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: "คุณไม่ได้เป็นสมาชิก!"}})
        }
    }

    return (
        <>
        <div className='container my-5 p-md-4 col-md-9 card'>
            {
                saleDetails && (
                    <>
                        <form className='row justify-content-between mb-2'>
                            <div className="my-3 col-md-8">
                                <Carousel images={JSON.parse(saleDetails.images)} id={saleDetails.SaleProduct_ID}/>
                            </div>

                            <div className="text-start mt-3 col-md-4">
                            <h4 className='text-danger fw-bold'>
                                {saleDetails.salename}
                            </h4>

                                <h6>รายละเอียดสินค้า: {saleDetails.description}</h6>
                                <h4><span className="badge bg-success">ราคา: {saleDetails.price} บาท</span></h4>
                                <h6>คงเหลือ: {saleDetails.inventories} ชิ้น</h6>
                                <hr/>
                                <h5 className='text-primary'>รายละเอียด</h5>
                                <h5>
                                    <Link to={`profile/${saleDetails.seller_id}`}>
                                        <span className="badge bg-primary">
                                            ผู้ขาย: {saleDetails.seller_id}
                                        </span>
                                    </Link>
                                </h5>
                                <h6>สถานะสินค้า: {saleDetails.status}</h6>
                                <h6>อัพเดท: {moment(saleDetails.updated).fromNow()}</h6>
                                <hr/>

                                <h5 className='text-success'>คำสั่งซื้อ</h5>
                                <input type="number" className='form-control' placeholder='จำนวนการสั่งซื้อ'
                                value={quantity} onChange={handleInput} name="quantity" />

                                <div className="d-grid gap-2 my-2">
                                    <button type="button" className='btn btn-success'
                                    onClick={handleBuyProduct}>
                                        <i className="fas fa-check-circle"/> ซื้อเลย
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                    onClick={handleAddCart}>
                                    <i className="fas fa-shopping-basket"/> เพิ่มใส่ตะกร้า
                                    </button>
                                    <button className="btn btn-secondary" type="button" onClick={handleBack}>
                                    <i className="fas fa-arrow-circle-left"/> ย้อนกลับ
                                    </button>
                                </div>
                            </div>

                        </form>
                        
                    </>
                )
            }
            
        </div>
        <div className="shopping_cart">
            <Link to="/shopping-cart">
                <img src={process.env.PUBLIC_URL + '/images/shopping-cart.png'} 
                className="logo_cart" alt="logo_shopping" />
                <span>
                    {
                    cart.myCart 
                    ? cart.myCart.length
                    : 0
                    }
                </span>
            </Link>
        </div>
        </>
    )
}

export default SaleProductDetails
