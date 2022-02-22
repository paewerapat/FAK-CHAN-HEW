import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { deleteCategory, updateCategory } from '../../redux/actions/categoryAction';

const CategoryItems = ({data, auth}) => {

    const [categoryData, setCategoryData] = useState(data);
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()

    const handleInput = (e) => {
        const { value, name } = e.target
        setCategoryData({...categoryData, [name]:value})
    }

    const handleSubmit = () => {
        dispatch(updateCategory({categoryData, auth}))
    }

    const handleDelete = () => {
        if(window.confirm("ยืนยันการลบหมวดหมู่นี้ไหม?")){
            dispatch(deleteCategory({categoryData, auth}))
        }
    }

    return (
        <tr>
            <td>
                {data.category_id}
            </td>
            <td>
                <input type="text" value={categoryData.category_name} disabled={edit ? '' : 'disabled'}
                onChange={handleInput} className="text-center" name="category_name" />
            </td>
            <td>
                <div className="btn-group dropdown">
                    <button className={`btn btn-sm dropdown-toggle btn-warning m-1`} type="button"
                    id="categoryActionDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        แก้ไข
                    </button>
                    <ul className="dropdown-menu" style={{cursor: 'pointer'}}
                    aria-labelledby="categoryActionDropdown">
                        <li>
                            <span className={`dropdown-item text-${edit ? 'secondary' : 'primary'}`} onClick={()=>setEdit(!edit)}>
                            <i className="fas fa-edit"/> {edit ? 'ยกเลิก' : 'อัพเดทข้อมูล'}
                            </span>
                        </li>
                        <li>
                            <span className="dropdown-item text-danger" onClick={handleDelete}>
                            <i className="fas fa-trash"/> ลบข้อมูล
                            </span>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-sm btn-primary m-1"
                disabled={edit ? '' : 'disabled'} onClick={handleSubmit}>
                    อัพเดท
                </button>
            </td>
        </tr>
    )
}

export default CategoryItems;
