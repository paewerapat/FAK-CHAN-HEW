import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAllCart, updateCart } from '../../redux/actions/cartAction'

const Cart = () => {

    const { cart, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [checkOut, setCheckOut] = useState([])

    function deleteItemCart(id) {
        const newCart = cart.myCart.map((seller) => {
            seller.details.filter((item) => {
                return item.sale_id !== id
            })
        })
        console.log(newCart)
    }

    function deleteSellerCart(id) {
        const newCart = cart.myCart.filter((item) => {
            return item.seller_id !== id
        })
        dispatch(updateCart(newCart, auth.token))
    }
    
    function clearMyCart() {
        if(window.confirm("คุณแน่ใจว่าต้องการลบสินค้าทั้งหมด?")){
            dispatch(deleteAllCart(auth.token))
        }
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h3><i className="fas fa-shopping-basket"/> ตะกร้าสินค้า</h3>
                <h6>รายการสินค้าทั้งหมดที่เพิ่มลงในตะกร้าก่อนการยืนยันการสั่งซื้อ</h6>
            </div>
            <hr className="w-75 mx-auto"/>

            <div className="row">
                <div className="container">
                    <div className="d-flex justify-content-end py-2">
                        <button type="button" className="btn btn-danger" onClick={clearMyCart} disabled={cart.myCart.length > 0 ? '' : 'disabled'}>
                        <i className="fa-solid fa-trash"/> ลบสินค้าทั้งหมด
                        </button>
                    </div>
                    {
                        (cart.myCart !== null && cart.myCart.length > 0) ?
                        cart.myCart.map((seller, index) => 
                        (
                            <div className="row card p-3 m-3" key={index}>
                                <div className="d-flex">
                                    <h5>
                                        ผู้ขาย: {seller.seller_id}
                                    </h5>
                                    <i className="fa-solid fa-trash cart_trash"
                                    onClick={()=>deleteSellerCart(seller.seller_id)}/>
                                </div>
                                <hr/>
                                {
                                    seller.details.map((item, index) => (
                                    <div className="row gap-1 justify-content-between mb-2" key={index}>

                                        <div className="justify-content-end d-flex">
                                            <i className="fa-solid fa-trash cart_trash"
                                            onClick={()=>deleteItemCart(item.sale_id)}/>
                                        </div>

                                        <div className="col-md-5 cart_images">
                                            <img src={item.images} style={{maxWidth: '120px'}}/>
                                        </div>

                                        <div className="col-md-5">
                                            <h6>
                                                รหัสการขาย: {item.sale_id}<br/>
                                                ชื่อสินค้า: {item.salename} <br/>
                                                จำนวน: {item.quantity}<br/>
                                                ราคาทั้งสิ้น: {item.total} <br/>
                                            </h6>
                                        </div>
                                    </div>
                                    ))
                                }
                            </div>
                        ))
                        :
                        <h4 className="text-center text-danger">คุณยังไม่มีสินค้าในตะกร้า!</h4>
                    }
                    <div className="row justify-content-center">
                        <div className="card col-md-4 p-3 m-3">
                            <h5 className="text-primary">ราคารวมทั้งสิ้น: {checkOut.total_price}</h5>
                            <button className="btn btn-success" type="button" disabled={cart.myCart.length > 0 ? '' : 'disabled'}>
                                ยืนยันการสั่งออเดอร์
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cart;
