import moment from 'moment'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import NoNotice from '../images/nonotice.png'
import { isReadNotify, NOTIFY_TYPES } from '../redux/actions/notifyAction'

function Notification() {

    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleIsRead = (msg) => {
        dispatch(isReadNotify({msg, auth}))
    }

    const handleSound = () => {
        dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    }

    const handleDeleteAll = () => {

    }

    const handleReadAll = () => {
        
    }

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5);

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

    const handleClick = (e) => {
        setcurrentPage(Number(e.target.id));
    }

    const handleLoadMore = () => {
        setitemsPerPage(itemsPerPage + 5)
    }

    const pages = [];
    for(let i=1; i<=Math.ceil(notify.result / itemsPerPage); i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = notify.data.slice(indexOfFirstItem, indexOfLastItem)

    const renderPageNumber = pages.map((number) => {
        if(number < maxPageNumberLimit + 1 && number >= minPageNumberLimit) {
            return (
                <li 
                className={`page-item ${currentPage === number ? "active": null}`}
                key={number}
                >
                    <span className="page-link" id={number} onClick={handleClick}>
                        {number}
                    </span>
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

    const renderNotify = (data) => {
        return data.map((msg, index) => (
            <div className="mb-1" key={index} onClick={() => handleIsRead(msg)}>
                <Link to={`${msg.url}`} className={`d-flex align-items-center rounded
                    ${msg.readed === 'false' ? 'bg-primary' : 'bg-secondary'}`}>
                    <img src={JSON.parse(msg.avatar)[0].url} alt="notify_avatar" className="rounded-circle notify_avatar" />
                    <div className="mx-1 flex-fill">
                        <strong className="text-light">{msg.text}</strong><br/>
                        <span className="text-light">จาก: {msg.full_name} | {msg.user}</span>
                    </div>
                    <small className="text-light d-flex justify-content-between px-2">
                        {moment(msg.created).fromNow()}
                        {
                            msg.readed === 'false' &&
                            <i className="mx-1 fas fa-circle text-warning" />
                        }
                    </small>
                </Link>
            </div>
        ))
    }

    return (
        <div className="container mt-5 col-md-9">
            <div className="text-center">
                <h3><i className="fas fa-bell text-primary"/> การแจ้งเตือน</h3>
                <h6>ระบบแจ้งเตือนการสั่งออเดอร์หรือใบฝากซื้อ สถานะการสั่งซื้อ/ออเดอร์ สถานะจัดส่ง</h6>
                <hr className="w-75 mx-auto" />
            </div>
            <div className="d-grid gap-2 d-md-flex align-items-center justify-content-md-end">
            {
                notify.sound
                ? <i className="fas fa-bell text-danger mr-1" 
                style={{fontSize: '1.2rem', cursor: 'pointer'}} 
                onClick={handleSound} />

                : <i className="fas fa-bell-slash text-danger mr-1" 
                style={{fontSize: '1.2rem', cursor: 'pointer'}} 
                onClick={handleSound} />
            }

                <button type="button" className="btn btn-sm btn-secondary" style={{cursor: 'pointer'}}
                onClick={handleReadAll}>
                    อ่านทั้งหมด
                </button>
                <button type="button" className="btn btn-sm btn-danger" style={{cursor: 'pointer'}}
                onClick={handleDeleteAll}>
                    ลบทั้งหมด
                </button>
            </div>
            {
                notify.data.length === 0 &&
                <>
                <h4 className="text-center text-danger">ไม่มีการแจ้งเตือนสำหรับคุณ</h4>
                <img src={NoNotice} alt="NoNotice" className="w-25 d-flex mx-auto" />
                </>
            }
            <div className="row mt-4 justify-content-center">
                <div className="col-md-9">

                {
                    renderNotify(currentItem)
                }
                    <button className="d-flex btn btn-primary mx-auto mt-3"
                    onClick={handleLoadMore}>
                        Load more
                    </button>
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
        </div>
    )
}

export default Notification
