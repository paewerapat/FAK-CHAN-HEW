export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: "ALERT",
    SOCKET: "SOCKET",
    ONLINE: "ONLINE",
    OFFLINE: "OFFLINE",
    PEER: "PEER",
    STATUS_PRODUCT: "STATUS_PRODUCT"
}


export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item.id === id ? post : item)
    )
    return newData;
}

export const DeleteData = (data, id) => {
    const newData = data.filter(item => item.id !== id)
    return newData;
}