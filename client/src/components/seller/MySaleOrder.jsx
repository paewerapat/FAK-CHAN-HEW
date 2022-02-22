import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import SaleOrderItem from './SaleOrderItem'

const MySaleOrder = () => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const [saleOrderData, setSaleOrderData] = useState([])
    const [result, setResult] = useState(null)
    const [status, setStatus] = useState("")

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const itemsPerPage = 5

    const pageNumberLimit = 5
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

    useEffect(() => {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        getDataAPI(`order-product-sale?page=${currentPage}${status && `&status=${status}`}`, auth.token)
        .then(res => {
            setSaleOrderData(res.data.orderProductSale)
            setResult(res.data.result)
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        }).catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: err.response.data.msg})
        })
    },[dispatch, auth.token, currentPage, status])

    const handleClick = (e) => {
        setcurrentPage(Number(e.target.id));
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const pages = [];
    for(let i=1; i<=Math.ceil(result / itemsPerPage); i++) {
        pages.push(i)
    }

    const renderPageNumber = pages.map((number) => {
        if(number < maxPageNumberLimit + 1 && number >= minPageNumberLimit) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return (
                <li 
                className={`page-item ${currentPage === number ? "active": null}`}
                key={number}
                onClick={handleClick}
                >
                    <button className="page-link" id={number}>
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
        if((currentPage - 1)%pageNumberLimit===0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const renderMySaleOrder = (data) => {
        return data.map((item) => (
            <SaleOrderItem orderData={item} key={item.sale_id} images={JSON.parse(item.images)}/>
        ))
    }

    console.log(saleOrderData);

    return (
        <div className='container mt-5'>
            <div className="text-center mb-3">
                <h3><i className="text-primary fas fa-receipt"/> ออเดอร์สินค้าขาย</h3>
                <h6>ตรวจสอบข้อมูลออเดอร์การขาย ดูข้อมูลผู้ซื้อและอัพเดทสถานะออเดอร์</h6>
            </div>
            <hr className="w-50 mx-auto"/>

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
                saleOrderData.length === 0 &&
                <h5 className="text-center text-danger">คุณยังไม่มีออเดอร์การขาย!</h5>
            }

            <div className="row mt-4 gap-2 justify-content-center">
            {
                renderMySaleOrder(saleOrderData)
            }
            </div>

            <nav aria-label="Page navigation">
                <ul className="pagination mt-4 d-flex justify-content-center" style={{cursor: 'pointer'}}>
                    <li className="page-item">
                        <button className="page-link"
                        onClick={handlePrevbtn}
                        disabled={currentPage===pages[0] ? true : false}>
                            Previous
                        </button>
                    </li>
                        {pageDecrementBtn}
                            {renderPageNumber}
                        {pageIncrementBtn}
                    <li className="page-item">
                        <button
                        className="page-link"
                        onClick={handleNextbtn}
                        disabled={currentPage===pages[pages.length - 1] ? true : false}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default MySaleOrder