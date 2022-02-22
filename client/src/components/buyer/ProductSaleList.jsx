import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductSaleItem from './ProductSaleItem'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { Link } from 'react-router-dom'

const ProductSaleList = () => {

    const { allCategories, cart } = useSelector(state => state)
    const dispatch = useDispatch();
    const [saleProducts, setSaleProducts] = useState([])
    const [result, setResult] = useState("")

    const initialState = {
        category_id: '', search: ''
    }

    const [searchData, setSearchData] = useState(initialState)
    const { category_id, search } = searchData

    const handleInput = (e) => {
        const { name, value } = e.target
        setSearchData({...searchData, [name]:value})
    }

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const itemsPerPage = 3

    const pageNumberLimit = 5
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

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
            return (
                <li 
                className={`page-item ${currentPage == number ? "active": null}`}
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
        getDataAPI(`product-sale?page=${currentPage}${search && `&search=${search}`}
        ${category_id && `&category=${category_id}`}`)
        .then(res => {
            setSaleProducts(res.data.productSale)
            setResult(res.data.result)
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        }).catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })
    },[currentPage, dispatch, category_id, search])

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
            <ProductSaleItem saleProduct={item} key={item.sale_id} images={JSON.parse(item.images)}/>
        ))
    }

    return (
        <>
        <div className="container mt-5">
            <div className="text-center">
                <h3><i className="fas fa-shopping-cart text-primary"/> รายการสินค้า</h3>
                <h6>รายการสินค้าขายของสมาชิกในหมู่บ้าน สามารถตรวจสอบข้อมูลสินค้าและข้อมูลผู้ขายได้</h6>
                <hr className="mx-auto w-50" />
            </div>

            <form className='row mt-4 col-md-9 mx-auto'>
                
                <div className="d-md-flex">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className='input-group-text'>หมวดหมู่: </span>
                                <select className='form-select' name="category_id" value={category_id}
                                onChange={handleInput}>
                                    <option selected value={''}>เลือกหมวดหมู่</option>
                                    {
                                        allCategories.category.map(item => (
                                            <option key={item.category_id} value={item.category_id}>
                                                {item.category_name}
                                            </option>
                                        ))
                                    }
                                </select>
                        </div>
                    </div>
                    
                    <div className="col-md-8">
                        <div className="input-group">
                        <input type="search" className="form-control" placeholder='กรอกชื่อสินค้า...'
                        name="search" value={search} onChange={handleInput} />
                            <button type="button" className="btn btn-primary col-md-2">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </div>
                        
            </form>

            <div className="mt-4 row justify-content-center ">
                {/* -------------List of Products--------------- */}
                {
                    renderSaleProducts(saleProducts)
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
        <div className="shopping_cart">
            <Link to="/shopping-cart">
                <img src={process.env.PUBLIC_URL + '/images/shopping-cart.png'} 
                className="logo_cart" alt="logo_shopping" />
                <span>
                    {
                    cart.myCart 
                    ? cart.myCart.length
                    : 0
                    }
                </span>
            </Link>
        </div>
        </>
    )
}

export default ProductSaleList
