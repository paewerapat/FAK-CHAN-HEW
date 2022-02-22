import React, { useState } from 'react';
import MapLeaflet from '../MapLeaflet'

const LocationItems = ({data}) => {

    const [locationData, setLocationData] = useState(data);
    const [edit, setEdit] = useState(false)

    return (
        <tr>
            <td>
                {data.location_id}
            </td>
            <td style={{height: '100px', minWidth: '200px'}}>
                <MapLeaflet locationName={locationData.location_name} lat={locationData.latitude} long={locationData.longitude}
                height={'200px'} />
            </td>
            <td>
                <input type="text" value={locationData.location_name} disabled={edit ? '' : 'disabled'}
                onChange={(e)=>setLocationData(e.target.value)} className="text-center" />
            </td>
            <td>
                <input type="text" value={locationData.service_time} disabled={edit ? '' : 'disabled'}
                onChange={(e)=>setLocationData(e.target.value)} name="service_time" className="text-center" />
            </td>
            <td>
                {locationData.distance} กม. | {locationData.service_charge} บาท
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
}

export default LocationItems;
