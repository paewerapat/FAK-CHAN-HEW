import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory } from '../redux/actions/categoryAction';
import { GLOBALTYPES } from '../redux/actions/globalTypes';


const AddCategoryModal = () => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!categoryName) return dispatch({type: GLOBALTYPES.ALERT, payload: {warning: "กรุณากรอกชื่อหมวดหมู่!"} })
        const values = {
            category_name: categoryName,
            category_id: ""
        }
        dispatch(createCategory({values, auth}))
    }

    return (
        <div className="modal fade" id="addCategoryModal" tabIndex={-1}>
            <form className="modal-dialog" onSubmit={handleSubmit}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                        เพิ่มหมวดหมู่สินค้า <i className="fas fa-question-circle text-primary"/>
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">

                    {/* ----------Product Input------------- */}
                    <input type="text" className='form-control mb-3' placeholder='ระบุหมวดหมู่สินค้า' 
                        value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>

                </div>
                    <div className="modal-footer">
                        <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">
                            <i className="fas fa-undo"/> ปิด
                        </button>
                        <button type="submit" className="btn btn-success" data-bs-dismiss="modal"
                        >
                            <i className="fas fa-share"/> เพิ่มหมวดหมู่
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddCategoryModal
