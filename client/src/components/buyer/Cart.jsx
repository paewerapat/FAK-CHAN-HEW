import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart } from '../../redux/actions/cartAction'

const Cart = () => {

    const { cart, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    
    function clearMyCart() {
        dispatch(deleteCart(auth.token))
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
                    <div className="justify-content-end">
                        <button type="button" className="btn btn-danger" onClick={clearMyCart}>
                            ลบสินค้าทั้งหมด
                        </button>
                    </div>
                    {
                        (cart.myCart !== null && cart.myCart.length > 0) ?
                        cart.myCart.map((seller) => 
                        (
                            <div className="row card p-3" key={seller.seller_id}>
                                <div className="d-flex justify-content-between">
                                    <h5>
                                        ผู้ขาย: {seller.seller_id}
                                    </h5>
                                    <input type="checkbox" name="seller_id" value={seller.seller_id} 
                                    className="" />
                                </div>
                                <hr/>
                                {
                                    seller.details.map((item) => (
                                    <div className="row" key={item.sale_id}>
                                        <div className="col-md-5">
                                            รหัสการขาย: {item.sale_id}
                                        </div>

                                        <div className="col-md-5">
                                            
                                        </div>
                                    </div>
                                    ))
                                }
                            </div>
                        ))
                        :
                        <h5 className="text-center text-danger">คุณยังไม่มีสินค้าในตะกร้า!</h5>
                    }
                </div>
            </div>
        </div>
    )
};

export default Cart;
