import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import ShipmentItem from './ShipmentItem'

const MyShipment = () => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [myShipment, setMyShipment] = useState([])
    const [result, setResult] = useState("")
    const [status, setStatus] = useState("")

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const itemsPerPage = 3

    const pageNumberLimit = 5;
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

    useEffect(() => {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        getDataAPI("my-shipment", auth.token)
        .then(res => {
            setMyShipment(res.data.shipment)
            setResult(res.data.result)
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        }).catch(err => {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        })
    }, [auth.token, dispatch])

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    }

    const pages = [];
    for(let i=1; i<=Math.ceil(result / itemsPerPage); i++ ) {
        pages.push(i);
    }

    const renderPageNumber = pages.map(number => {
        if(number < maxPageNumberLimit + 1 && number >= minPageNumberLimit) {
            return (
                <li 
                className={`page-item ${currentPage === number ? "active": null}`}
                key={number}
                >
                    <button className="page-link" id={number} onClick={handleClick}>
                        {number}
                    </button>
                </li>
                );
        } else {
            return null
        }
    })

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        if(currentPage+1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
        if((currentPage - 1)%pageNumberLimit===0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };
    const handleMorePage = () => {
        setcurrentPage(currentPage + 3);
        if(currentPage+3 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + 3);
            setminPageNumberLimit(minPageNumberLimit + 3);
        }
    }
    const handleLessPage = () => {
        setcurrentPage(currentPage - 3);
        if(currentPage - 3 < minPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit - 3);
            setminPageNumberLimit(minPageNumberLimit - 3);
        }
    }

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleMorePage}> &hellip; </li>
    }
    let pageDecrementBtn = null;
    if(minPageNumberLimit > 1) {
        pageDecrementBtn = <li onClick={handleLessPage}> &hellip; </li>
    }

    const renderMyShipment = (myShipment) => {
        return (
            myShipment.map((item, index)=> (
                <ShipmentItem myShipment={item} key={index} productItems={JSON.parse(item.product_items)}/>
            ))
        )
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h3><i className="fas fa-dolly text-warning"/> การจัดส่งของฉัน</h3>
                <h6>ข้อมูลการรับออเดอร์ใบฝากซื้อ การอัพเดทสถานะออเดอร์ใบฝากซื้อ</h6>
            </div>
            <hr className="w-50 mx-auto" />

            <div className="row gap-2 text-center justify-content-center">
                <form className="d-md-flex col-md-6 my-4">
                    <div className="input-group">
                        <span className='input-group-text'>สถานะสมาชิก: </span>
                        <select className='form-select text-center' value={status}
                        onChange={(e) => setStatus(e.target.value)} >
                            <option selected value={''}>ใบฝากซื้อทั้งหมด</option>
                            <option value={'รอการตอบรับ'} className="text-secondary">
                                รอการตอบรับ
                            </option>
                            <option value={'กำลังจัดซื้อ'} className="text-primary">
                                กำลังจัดซื้อ
                            </option>
                            <option value={'จัดส่งแล้ว'} className="text-primary">
                                จัดส่งแล้ว
                            </option>
                            <option value={'เสร็จสิ้น'} className="text-primary">
                                เสร็จสิ้น
                            </option>
                        </select>
                    </div>
                </form>
            </div>
            
            {
                myShipment.length > 0
                ?
                <>

                {
                    renderMyShipment(myShipment)
                }
                <nav aria-label="Page navigation">
                    <ul className="pagination mt-5 d-flex justify-content-center">
                        <li className="page-item">
                            <button className="page-link"
                            onClick={handlePrevbtn}
                            disabled={currentPage === pages[0] ? true : false}>
                                Previous
                            </button>
                        </li>
                            {pageDecrementBtn}
                                {renderPageNumber}
                            {pageIncrementBtn}
                        <li className="page-item">
                            <button className="page-link"
                            onClick={handleNextbtn}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
                </>
                :
                <h5 className="text-center text-danger">คุณยังไม่ได้รับออเดอร์ใบฝากซื้อ!</h5>
            }

        </div>
    )
}

export default MyShipment
