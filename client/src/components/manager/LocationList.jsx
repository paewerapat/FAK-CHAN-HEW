import React, { useState } from "react";
import { useSelector } from "react-redux";
import LocationItems from "./LocationItems";

const LocationList = () => {

    const { allLocation } = useSelector(state => state);
    const result = allLocation.location.length

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const itemsPerPage = 5

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

    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = allLocation.location.slice(indexOfFirstItem, indexOfLastItem)

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

    const RenderAllLocation = (data) => {
        return data.map((location) => (
            <LocationItems data={location} key={location.location_id} />
        ))
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h3>รายการสินค้า</h3>
                <h6>สามารถอัพเดท ลบข้อมูลสินค้าที่ไม่เหมาะสม</h6>
            </div>

            <hr className="w-75 mx-auto"/>
            <div className="row justify-content-center">

                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered text-center">
                        <thead className='bg-dark text-light'>
                            <tr className="align-middle">
                                <th scope="col">ไอดี</th>
                                <th scope="col">แผนที่</th>
                                <th scope="col">ชื่อสถานที่</th>
                                <th scope="col">วัน/เวลาบริการ</th>
                                <th scope="col">ระยะทาง/ค่าบริการ</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {
                                RenderAllLocation(currentItem)
                            }
                        </tbody>
                    </table>
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

export default LocationList
