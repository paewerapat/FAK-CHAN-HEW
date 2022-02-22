import React, {useState, useEffect} from 'react'
import {
    MapContainer, TileLayer, Marker, Popup, useMapEvents
} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// Customize Icons
const myIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/images/village.png',
    iconSize: [50, 50]
});

const MapLeaflet = ({handleGetLatLong, locationName, lat, long, height}) => {

    const village = [7.214503580149856, 100.59587883443263]
    const [marker, setMarker] = useState(null)
    window.dispatchEvent(new Event('resize'));

    const GetLatLong = () => {
        const map = useMapEvents({
            click(e){
                const latlong = e.latlng
                handleGetLatLong(latlong.lat, latlong.lng)
                setMarker(latlong)
                map.flyTo(latlong)
            },
        })
        return marker == null
        ? null
        : <Marker position={marker}>
            <Popup>
                { 
                locationName
                ? locationName
                : 'กรุณาระบุชื่อสถานที่!'
                }
            </Popup>
        </Marker>
    }

    const CurrentLocation = () => {
        return (
            <Marker position={[lat, long]}>
                <Popup>
                    { locationName }
                </Popup>
            </Marker>
        )
    }

    return (
        <>
            <MapContainer 
            center={(lat && long) ? [lat, long] : village} 
            zoom={12}
            scrollWheelZoom={true}
            style={height ? {height: height} : {height: '50vh'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={village} icon={myIcon}>
                    <Popup>
                    123/56. <br /> หมู่บ้านฝากฉันหิ้ว.
                    </Popup>
                </Marker>
            {
                (lat && long && locationName)
                ? 
                <CurrentLocation />
                :
                <GetLatLong />
            }
            </MapContainer>
        </>
    )
}

export default MapLeaflet
