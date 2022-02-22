import React, { useState } from 'react';
import { postDataAPI } from '../../utils/fetchData'
import { useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const ProductItems = ({data, images, categories, auth}) => {

    const dispatch = useDispatch()
    const [productData, setProductData] = useState(data)
    const [edit, setEdit] = useState(false)
    const category = categories.filter(item => 
        item.category_id === data.category_id
    )[0]

    const handleInput = (e) => {
        const {name, value} = e.target
        setProductData({...productData, [name]:value})
    }

    const handleDeleteImages = async () => {
        if(window.confirm("ยืนยันการลบรูปภาพสินค้าไหม?")){
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
            await postDataAPI("images", images, auth.token)
            .then(res => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg }})
                dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}}) 
            }).catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
        }
    }

    return (
        <tr>
            <td>
                {data.product_id}
            </td>
            <td className="show_images_list">
                <img src={images.url} alt="product_images" 
                style={{maxHeight: "50px"}}/>
                <span onClick={handleDeleteImages}>&times;</span>
            </td>
            <td>
                <input type="text" value={productData.product_name} name="product_name"
                onChange={handleInput} disabled={edit ? '' : 'disabled'} />
            </td>
            <td>
                <select name="category_id"
                onChange={handleInput} disabled={edit ? '' : 'disabled'}>
                    <option selected value={category.category_id}>
                        {category.category_name}
                    </option>
                    {
                        categories.map(item => (
                            <option value={item.category_id}>
                                {item.category_name}
                            </option>
                        ))
                    }
                </select>
            </td>
            <td>
                <button className={`btn btn-sm btn-${edit ? 'secondary' : 'warning'} m-1`} onClick={()=>setEdit(!edit)}>
                    {edit ? 'ยกเลิก' : 'แก้ไข'}
                </button>
                <button className="btn btn-sm btn-primary m-1"
                disabled={edit ? '' : 'disabled'}>
                    อัพเดท
                </button>
            </td>
        </tr>
    )
};

export default ProductItems;
