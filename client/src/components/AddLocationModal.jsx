import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createLocation } from '../redux/actions/locationAction';
import MapLeaflet from './MapLeaflet';

const AddLocationModal = () => {

    const dispatch = useDispatch()
    const { auth, services } = useSelector(state => state)
    const initialState = {
        latitude: '', longitude: '', location_name: '', service_time: '', distance: '', service_charge: ''
    }

    const [locationData, setLocationData] = useState(initialState)
    const { latitude, longitude, location_name, service_time, } = locationData

    const handleGetLatLong = (lat, long) => {
        setLocationData({...locationData, latitude: lat, longitude: long})
    }

    const handleInput = (e) => {
        const { name, value} = e.target
        setLocationData({...locationData, [name]:value})
    }

    const currentLat = '7.214503580149856'
    const currentLong = '100.59587883443263'
    const R = 6371e3; // metres
    const φ1 = currentLat * Math.PI/180; // φ, λ in radians
    const φ2 = latitude * Math.PI/180;
    const Δφ = (latitude-currentLat) * Math.PI/180;
    const Δλ = (longitude-currentLong) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = (Math.ceil(R * c))/1000 // in Kilometers
    // ใช้ค่าจากตารางแทน
    const service_charge = Math.ceil(distance*services.distance_charge)

    useEffect(() => {
        if(distance && service_charge){
            setLocationData({
                ...locationData,
                distance: distance,
                service_charge: service_charge
            })
        }
    }, [distance, service_charge])

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        dispatch(createLocation({locationData, auth}))
    }

    return (

            <div className="modal fade" id="addLocationModal" tabIndex={1}>
                <form className="modal-dialog modal-lg" onSubmit={handleLocationSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                เพิ่มสถานที่ <i className="fas fa-question-circle text-primary"/>
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                    <div className="modal-body row justify-content-center">

                        <div className="input-group mb-2">
                            <span className="input-group-text">ชื่อสถานที่</span>
                            <input type="text" placeholder='ระบุชื่อสถานที่' name="location_name"
                            className='form-control' value={location_name} onChange={handleInput}/>
                        </div>
                        <div className="input-group mb-2">
                            <span className="input-group-text">วัน/เวลาทำการ</span>
                            <input type="text" placeholder='เช่น จันทร์-ศุกร์ 6.00น.-18.00น.' name="service_time"
                            className='form-control' value={service_time} onChange={handleInput}/>
                        </div>
                        

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group mb-2">
                                    <span className="input-group-text">ละติจูด</span>
                                    <input type="text" placeholder='คลิ๊กบนแผนที่เพื่อเพิ่มละติจูด' name="latitude" value={latitude}
                                    className='form-control col-md-9' disabled />
                                </div>

                                <div className="input-group mb-2">
                                    <span className="input-group-text">ลองจิจูด</span>
                                    <input type="text" placeholder='คลิ๊กบนแผนที่เพื่อเพิ่มลองจิจูด' name="longitude" value={longitude}
                                    className='form-control' disabled />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group mb-2">
                                <span className="input-group-text">ระยะทาง</span>
                                    <input type="text" value={distance} disabled
                                    className='form-control' />
                                    <span className="input-group-text">กิโลเมตร</span>
                                </div>

                                <div className="input-group mb-2">
                                    <span className="input-group-text">ค่าบริการ</span>
                                    <input type="text" value={service_charge} disabled
                                    className='form-control' />
                                    <span className="input-group-text">บาท</span>
                                </div>
                            </div>
                        
                        <MapLeaflet handleGetLatLong={handleGetLatLong} locationName={location_name}/>
                    </div>

                    </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">
                                <i className="fas fa-undo"/> ปิด
                            </button>
                            <button type="submit" className="btn btn-success" data-bs-dismiss="modal"
                            >
                                <i className="fas fa-share"/> เพิ่มสถานที่
                            </button>
                        </div>
                    </div>
                </form>
             </div>
    )
}

export default AddLocationModal
