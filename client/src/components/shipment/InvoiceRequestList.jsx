import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import InvoiceRequestItem from './InvoiceRequestItem'


const InvoiceRequestList = () => {

    const { allLocation, auth, socket } = useSelector(state => state)
    const initialState = {
        location_id: '', search: ''
    }
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState(initialState)
    const [invoiceData, setInvoiceData] = useState([])
    const [result, setResult] = useState("")
    const { location_id } = searchData

    const handleInput = (e) => {
        const {name,value} = e.target
        setSearchData({...searchData, [name]:value })
    }

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const itemsPerPage = 3

    const pageNumberLimit = 5
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

    const handleClick = (e) => {
        setcurrentPage(Number(e.target.id));
    }

    const pages = [];
    for(let i=1; i<=Math.ceil(result / itemsPerPage); i++) {
        pages.push(i)
    }

    const renderPageNumber = pages.map((number) => {
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

    useEffect(() => {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        getDataAPI(`invoice?page=${currentPage}
        ${location_id && `&location=${location_id}`}`)
        .then(res => {
            setInvoiceData(res.data.invoice)
            setResult(res.data.result)
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        }).catch(err => {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg }
            })
        })
    }, [dispatch, currentPage, location_id])

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

    const renderSaleProducts = (data) => {
        return data.map(item => (
            <InvoiceRequestItem invoiceData={item} key={item.invoice_id} productItems={JSON.parse(item.product_items)}
            auth={auth} socket={socket} />
        ))
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
            <h3><i className="fas fa-file-invoice text-primary"/> รายการใบฝากซื้อ</h3>
            <h6>ใบฝากซื้อที่สมาชิกต้องสินค้าตามสถานที่ต่างๆ สามารถกดรับออเดอร์เพื่อจัดส่งให้สมาชิก</h6>
            <hr className="w-50 mx-auto"/>
            </div>

            <div className="row mt-3 col-md-6 mx-auto">
                <form className="d-md-flex">
                    <div className="input-group">
                        <span className='input-group-text'>สถานที่: </span>
                        <select className='form-select' name="location_id" value={location_id}
                        onChange={handleInput}>
                            <option selected value={''}>เลือกสถานที่</option>
                            {
                                allLocation.location.map(item => (
                                    <option key={item.location_id} value={item.location_id}>
                                        {item.location_name} | {item.distance} กม.
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </form>
            </div>

            <div className="row mt-4 justify-content-center">
                {
                    renderSaleProducts(invoiceData)
                }
            </div>

            <nav aria-label="Page navigation">
                <ul className="pagination mt-5 d-flex justify-content-center" style={{cursor: 'pointer'}}>
                    <li className="page-item">
                        <button className="page-link"
                         onClick={handlePrevbtn}
                         disabled={currentPage===Number(pages[0]) ? true : false}>
                            Previous
                        </button>
                    </li>
                        {pageDecrementBtn}
                            {renderPageNumber}
                        {pageIncrementBtn}
                    <li className="page-item">
                        <button className="page-link"
                         onClick={handleNextbtn}
                         disabled={currentPage===Number(pages[pages.length - 1]) ? true : false}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default InvoiceRequestList
