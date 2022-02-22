import React from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { useSelector } from 'react-redux'
import moment from 'moment'

function Home() {

    const { allProductSale, invoices } = useSelector(state => state)

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel">
                <img src={`${process.env.PUBLIC_URL} /images/online.jpg`} className="d-block w-100 header_image" alt="..." />
                <div className="carousel-caption">
                    <h2>
                        ฝากฉันหิ้ว <br/>
                        FAK-CHAN-HEW
                    <hr/>
                    </h2>
                    <h5>
                    <Typewriter options={{loop: true}}
                        onInit={(typewriter) => {
                            typewriter
                            .typeString("เว็บแอปพลิเคชั่นฝากซื้อและร้านค้าสำหรับหมู่บ้าน เพื่อบริการรับฝากหิ้วสินค้า การขายสินค้าและการจัดส่ง")
                            .pauseFor(2000)
                            .deleteAll()
                            .start()
                        }}
                    />
                        
                    </h5>
                </div>
            </div>

            <div className="container mt-5">
                <div className="text-center mt-5 mb-4">
                    <h4 className='fw-bolder text-success'>คุณสามารถทำอะไรได้บ้าง?</h4>
                    <h6>คุณสามารถเป็นทั้งผู้ซื้อ ผู้ขายหรือผู้จัดส่งสินค้าก็ได้</h6>
                </div>
                <hr className='w-50 mx-auto'/>
                
                <div className="card_icon_function mt-3 mb-5">
                    <div className="row">
                        <div className="col-md-3 icon_container">
                            <img src={`${process.env.PUBLIC_URL} /images/buyer.png`} alt="icon_product" className='icon_function'/>
                            <div className="text-center text-secondary">
                                <h5>ซื้อสินค้า?</h5>
                                <p>เลือกซื้อสินค้าที่ผู้ขายลงไว้ สามารถนัดรับได้เองหรือให้ผู้ขายจัดส่ง</p>
                            </div>
                        </div>

                        <div className="col-md-3 icon_container">
                            <img src={`${process.env.PUBLIC_URL} /images/seller.png`} alt="icon_product" className='icon_function'/>
                            <div className="text-center text-secondary">
                                <h5>ขายสินค้า?</h5>
                                <p>สามารถสร้างรายการขายสินค้าต่างๆได้และต้องเป็นผู้จัดส่งสินค้าเอง</p>
                            </div>
                        </div>

                        <div className="col-md-3 icon_container">
                            <img src={`${process.env.PUBLIC_URL} /images/basket.png`} alt="icon_product" className='icon_function'/>
                            <div className="text-center text-secondary">
                                <h5>ฝากซื้อสินค้า?</h5>
                                <p>สร้างใบฝากซื้อสินค้าให้ผู้รับฝากซื้อจัดหาสินค้าและส่งสินค้าให้</p>
                            </div>
                        </div>

                        <div className="col-md-3 icon_container">
                            <img src={`${process.env.PUBLIC_URL} /images/rider.png`} alt="icon_product" className='icon_function'/>
                            <div className="text-center text-secondary">
                                <h5>รับฝากซื้อสินค้า?</h5>
                                <p>เลือกรายการจากใบฝากซื้อเพื่อจัดหาสินค้าและจัดส่งสินค้าให้</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="fw-bolder mb-3">
                        <span className="badge bg-danger"><i className="fab fa-shopify"/> สินค้าใหม่</span>
                    </h2>
                    <h6>รายการสินค้าใหม่ 3 รายการที่พึ่งอัพเดทล่าสุด!</h6>
                </div>
                <hr className='w-50 mx-auto'/>
                <div className="row gap-2 justify-content-center py-4">
                   {
                        allProductSale.productSale.slice(-3).map((data) => {
                            const images = JSON.parse(data.images)
                        return (
                            <div className="col-lg-3 mb-3 p-2" key={data.sale_id}>
                                <div className="card" style={{height: '100%'}}>
                                    <img src={images[0].url} className="card-img-top w-100" alt="..." 
                                    style={{maxHeight: '300px', objectFit: 'cover'}}/>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-danger">{data.salename}</h5>
                                        <h6 className="card-text">{data.description}</h6>
                                        <h5><span className="badge bg-success">ราคา: {data.price} บาท</span></h5>
                                        <p className='text-end'>อัพเดท: {moment(data.updated).fromNow()}</p>
                                        <hr/>
                                        <div className="d-grid">
                                            <Link to={`/sale-product/${data.sale_id}`} 
                                            style={{textDecoration: 'none', color: 'inherit', display: 'grid'}}>
                                                <button className="btn btn-outline-secondary">
                                                    ดูสินค้า
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                   }
                </div>

                <div className="text-center">
                    <h2 className="fw-bolder mt-5">
                        <span className="badge bg-danger"><i className="fab fa-shopify"/> ใบฝากซื้อใหม่!</span>
                    </h2>
                    <h6>รายการใบฝากซื้อใหม่ 3 รายการที่พึ่งอัพเดทล่าสุด!</h6>
                </div>
                <hr className='w-50 mx-auto'/>
                <div className="row gap-2 justify-content-center py-4">
                    {
                        invoices.invoice.slice(-3).map((data) => {
                            const productItems = JSON.parse(data.product_items)
                        return (
                            <div className="col-lg-3 mb-3 p-2" key={data.sale_id}>
                                <div className="card" style={{height: '100%'}}>
                                    <img src={JSON.parse(productItems[0].images).url} className="card-img-top w-100" alt="..." 
                                    style={{maxHeight: '300px', objectFit: 'cover'}}/>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-danger">{data.location_name}</h5>
                                        <h6 className="card-text">{data.description}</h6>
                                        <h5><span className="badge bg-primary">สินค้า: {productItems.length} รายการ</span></h5>
                                        <h5><span className="badge bg-success">ค่าใช้จ่าย: {data.total} บาท</span></h5>
                                        <p className='text-end'>อัพเดท: {moment(data.updated).fromNow()}</p>
                                        <hr/>
                                        <div className="d-grid">
                                            <Link to={`/sale-product/${data.sale_id}`} 
                                            style={{textDecoration: 'none', color: 'inherit', display: 'grid'}}>
                                                <button className="btn btn-outline-secondary">
                                                    ดูรายละเอียด
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                   }
                </div>
                
                <h4 className='text-center text-primary mt-5 fw-bolder'>ข้อมูลเพิ่มเติม</h4>
                <hr className='w-50 mx-auto'/>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-4 m-1 mb-3">
                        <h5 className='text-center'>วิธีการใช้งานเบื้องต้น</h5>
                        <hr className='w-50 mx-auto'/>
                        <ol className="mt-4 list-group list-group-numbered">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">การเป็นสมัครสมาชิก</div>
                                    <p>เข้าสู่เมนูสมัครสมาชิก &gt;&gt; กรอกข้อมูลส่วนตัว &gt;&gt; บันทึกข้อมูล</p>
                                </div>
                                
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">สมัครสมาชิกแล้วใช้งานไม่ได้</div>
                                    <p>หลังจากสมัครสมาชิกแล้วต้องรอการยืนยันตัวตนจากผู้ดูแลระบบ</p>
                                </div>
                                
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">ตรวจสอบข้อมูลส่วนตัว</div>
                                    <p>เข้าสู่เมนูโปรไฟล์ส่วนตัว &gt;&gt; สถานะการเป็นสมาชิก</p>
                                </div>
                                
                            </li>
                        </ol>
                    </div>

                    <div className="col-md-4 m-1">
                        <div className="text-center">
                            <h5>ติดต่อเจ้าหน้าที่</h5>
                            <hr className='w-50 mx-auto'/>
                            <img src={`${process.env.PUBLIC_URL} /images/manager.png`} alt="service" className='icon_function' />
                            <p>สามารถติดต่อเจ้าหน้าที่ได้โดยตรง <br/> เบอร์โทรศัพท์ 012-3456789</p>
                        </div>
                    </div>
                    
                </div>

            </div>
        </>

    )
}

export default Home
