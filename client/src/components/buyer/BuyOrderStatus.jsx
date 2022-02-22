import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData';
import BuyOrderItem from './BuyOrderItem';

const BuyOrderStatus = () => {

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state)
    const [ myOrderData, setMyOrderData ] = useState([])
    const [ result, setResult ] = useState("")
    const [ status, setStatus ] = useState("")

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const itemsPerPage = 3

    const pageNumberLimit = 5;
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

    useEffect(() => {
        getDataAPI(`order-buy-product?page=${currentPage}${status && `&status=${status}`}`, auth.token)
        .then(res => {
            setMyOrderData(res.data.orderBuyProduct)
            setResult(res.data.result)
        }).catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
        })
    }, [auth.token, dispatch, currentPage, status])

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
        window.scrollTo({ top: 0, behavior: 'smooth' })
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

    const renderMyOrder = (mySaleData) => {
        return (
            mySaleData.map((item, index)=> (
                <BuyOrderItem orderData={item} key={index} images={JSON.parse(item.images)[0]}
                auth={auth} />
            ))
        )
    }

    return (
        <div className='container mt-5'>
            <div className="text-center">
                <h3><i className="fas fa-info-circle text-primary"/> สถานะคำสั่งซื้อ</h3>
                <h6>ตรวจสอบข้อมูล สถานะคำสั่งซื้อ และอัพเดทสถานะการรับสินค้า</h6>
                <hr className="w-50 mx-auto" />
            </div>

            <div className="row gap-2 text-center justify-content-center">

                <form className="d-md-flex col-md-6 my-2">
                    <div className="input-group">
                        <span className='input-group-text'>สถานะ: </span>
                        <select className='form-select' name="location_id" value={status}
                        onChange={(e) => setStatus(e.target.value)} >
                            <option selected value={''}>เลือกสถานะ</option>
                            <option value={"รอการตอบรับ"} className="text-secondary">
                                รอการตอบรับ
                            </option>
                            <option value={"เตรียมจัดส่ง"} className="text-primary">
                                เตรียมจัดส่ง
                            </option>
                            <option value={"เสร็จสิ้น"} className="text-success">
                                เสร็จสิ้น
                            </option>
                        </select>
                    </div>
                </form>

            </div>
            {
                myOrderData.length > 0
                ?
                <>
                {
                    renderMyOrder(myOrderData)
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
                <h5 className="text-center text-danger fw-bolder">คุณยังไม่มีคำสั่งซื้อ!</h5>
            }

        </div>
    )
}

export default BuyOrderStatus
