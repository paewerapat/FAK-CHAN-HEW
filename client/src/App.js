import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './redux/actions/globalTypes'
import Peer from 'peerjs'
import io from 'socket.io-client'

import { currentUser } from './redux/actions/authAction';
import { getCategory } from './redux/actions/categoryAction';
import { getProducts } from './redux/actions/productAction';
import { getProductSale } from './redux/actions/productSaleAction';
import { getNotifies } from './redux/actions/notifyAction';
import { getLocation } from './redux/actions/locationAction';
import { getProductByLocation } from './redux/actions/productByLocationAction';
import { getInvoice } from './redux/actions/invoiceAction'
import { getCart } from './redux/actions/cartAction';

import Pages from './Pages'
import { getServicesCharge } from './redux/actions/servicesAction';


function App() {

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if(token) dispatch(currentUser(token))

    const socket = io();
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })

    dispatch({type: GLOBALTYPES.PEER, payload: newPeer})
  }, [dispatch])

  useEffect(() => {
    if(auth.token){
      dispatch(getCategory(auth.token))
      dispatch(getProducts(auth.token))
      dispatch(getNotifies(auth.token))
      dispatch(getLocation(auth.token))
      dispatch(getProductByLocation(auth.token))
      dispatch(getServicesCharge(auth.token))
      dispatch(getCart(auth.token))
    }
    dispatch(getProductSale())
    dispatch(getInvoice())
  }, [dispatch, auth.token])

  return (
    <>
    <Router>
      <Pages />
    </Router>
    </>
  );
}

export default App;
