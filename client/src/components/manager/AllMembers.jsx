import React, { useEffect, useState } from 'react'
import { getDataAPI } from '../../utils/fetchData'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import {
    TeamOutlined
} from '@ant-design/icons'
import { updateRoleMember } from '../../redux/actions/memberAction';

const AllMembers = () => {

    const { auth, socket } = useSelector(state => state);
    const [members, setMembers] = useState([])
    const [result, setResult] = useState(null)
    const [role, setRole] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        getDataAPI(`all-members?page=${currentPage}${role && `&role=${role}`}`, auth.token)
        .then(res => {
            setMembers(res.data.members)
            setResult(res.data.result)
        }).catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        })
    }, [auth.token, dispatch, role, currentPage])

    const handleUpdateRole = (id) => {
        dispatch(updateRoleMember({id, auth, socket}))
    }

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

    const renderAllMember = (data) => {
        return data.map((member, index) => (
            <tr key={index}>
                <td>
                    <img src={JSON.parse(member.avatar)[0].url} alt="avatar" className="rounded-circle members_avatar"/>
                </td>
                <td>{member.villagers_id}</td>
                <td>{member.full_name}</td>
                <td>{member.house_number}</td>
                <td>{member.alley}</td>
                <td>
                    {member.role === 0 
                    ? <>
                    <i class="fas fa-question-circle"/> รอการยืนยัน
                    </>
                    : member.role === 1 
                    ? <p className="text-success">
                    <i class="fas fa-check-double"/> ยืนยันตัวตนแล้ว
                    </p>
                    : 'ผู้จัดการ'}
                </td>
                {
                    member.role !== 2 &&
                    <td>
                        <div className="dropdown">
                            <button className="btn btn-sm btn-primary dropdown-toggle" type="button"
                            id="memberActionDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                สถานะ
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="memberActionDropdown"
                            style={{cursor: 'pointer'}}>
                            {
                                member.role === 0
                                ?
                                    <li>
                                        <span className="dropdown-item text-success"
                                        onClick={() => handleUpdateRole(member.villagers_id)}>
                                        <i className="fas fa-check-circle"/> ให้สิทธิ์การเป็นสมาชิก
                                        </span>
                                    </li>
                                :
                                    <li>
                                        <span className="dropdown-item text-danger">
                                        <i className="fas fa-trash"/> ลบสมาชิก
                                        </span>
                                    </li>
                            }
                            </ul>
                        </div>
                    </td>
                }
            </tr>
        ))
    }

    return (
        <div className='container mt-5'>
            <h3 className='text-center'><TeamOutlined /> สมาชิกในหมู่บ้าน</h3>
            <h6 className="text-center">ข้อมูลสมาชิกทั้งหมดบนเว็บไซต์ กรุณาตรวจสอบข้อมูลให้ละเอียดก่อนการให้สิทธิ์</h6>
            <hr className="w-75 mx-auto"/>
            <div className="row justify-content-center">

                <form className="d-md-flex col-md-6 mb-3">
                    <div className="input-group">
                        <span className='input-group-text'>สถานะสมาชิก: </span>
                        <select className='form-select text-center' value={role}
                        onChange={(e) => setRole(e.target.value)} >
                            <option selected value={''}>สมาชิกทั้งหมด</option>
                            <option value={0} className="text-secondary">
                                ยังไม่ได้ยืนยันตัวตน
                            </option>
                            <option value={1} className="text-primary">
                                ยืนยันตัวตนแล้ว
                            </option>
                        </select>
                    </div>
                </form>

                <div className="table-responsive col-md-9">
                    <table className="table table-hover table-striped table-bordered text-center">
                        <thead className='bg-dark text-light'>
                            <tr className="align-middle">
                                <th scope="col">โปรไฟล์</th>
                                <th scope="col">เบอร์โทรศัพท์</th>
                                <th scope="col">ชื่อ-สกุล</th>
                                <th scope="col">บ้านเลขที่</th>
                                <th scope="col">ซอย</th>
                                <th scope="col">ยืนยันตัวตน</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {
                                renderAllMember(members)
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

export default AllMembers
