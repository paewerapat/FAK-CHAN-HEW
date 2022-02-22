import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import ProductSaleItem from './ProductSaleItem'

const MyProductSale = () => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const [mySaleData, setMySaleData] = useState([]);
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
        getDataAPI(`my-product-sale?page=${currentPage}${status && `&status=${status}`}`, auth.token)
        .then(res => {
            setMySaleData(res.data.myProductSale)
            setResult(res.data.result)
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        }).catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })
    }, [auth.token, status, dispatch, currentPage])
    
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

    const renderMySaleProducts = (mySaleData) => {
        return (
            mySaleData.map((item, index)=> (
            <ProductSaleItem saleData={item} key={index} images={JSON.parse(item.images)}
            auth={auth} />
            ))
        )
    }

    return (
        <div className='container mt-5'>
            <div className="text-center mb-3">
                <h3><i className="fas fa-box text-warning"/> สินค้าขายของฉัน</h3>
                <h6>ตรวจสอบสินค้าที่ลงขาย จำนวนคงเหลือในสต็อก การอัพเดทข้อมูลและสถานะต่างๆของสินค้า</h6>
            </div>
            <hr className="w-50 mx-auto"/>

            <div className="row gap-2 text-center justify-content-center">
                <form className="d-md-flex col-md-6 my-2">
                    <div className="input-group">
                        <span className='input-group-text'>สถานะ: </span>
                        <select className='form-select' name="location_id" value={status}
                        onChange={(e) => setStatus(e.target.value)} >
                            <option selected value={''}>เลือกสถานะ</option>
                            <option value={"มีสินค้า"} className="text-success">
                                มีสินค้า
                            </option>
                            <option value={"สินค้าหมด"} className="text-danger">
                                สินค้าหมด
                            </option>
                        </select>
                    </div>
                </form>
            </div>

            {
                mySaleData.length > 0
                ?
                <>
                {
                    renderMySaleProducts(mySaleData)
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
                <h5 className="text-center text-danger">คุณยังไม่มีสินค้าขาย!</h5>
            }

        </div>
    )
}

export default MyProductSale
