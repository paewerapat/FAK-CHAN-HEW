import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import SocketClient from './SocketClient'
// Style
import 'antd/dist/antd.css';
import './styles/global.css'
import { Layout } from 'antd';
// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Sidebar
import Sidebar from './menu/Sidebar';
// Page
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Notification from './pages/Notification';
import NotFound from './components/NotFound';
// Components Buyer
import ProductSaleList from './components/buyer/ProductSaleList';
import ProductSaleDetails from './components/buyer/ProductSaleDetails';
import BuyOrderStatus from './components/buyer/BuyOrderStatus';
import Cart from './components/buyer/Cart';
// Components Seller
import MyProductSale from './components/seller/MyProductSale';
import MySaleOrder from './components/seller/MySaleOrder';
import AddProductSale from './components/seller/AddProductSale'
// Components Invoice
import AddInvoice from './components/invoice/AddInvoice';
import InvoiceRequestList from './components/shipment/InvoiceRequestList'
import InvoiceDetail from './components/shipment/InvoiceDetail'
import MyInvoice from './components/invoice/MyInvoice'
// Components Shipments
import MyShipment from './components/shipment/MyShipment';
import GuestRoute from './functions/GuestRoute';
// Components Manager
import AllMembers from './components/manager/AllMembers';
import ProductList from './components/manager/ProductList'
import CategoryList from './components/manager/CategoryList'
import LocationList from './components/manager/LocationList'
// Member Route
import MemberRoute from './functions/MemberRoute'
// Manager Router
import ManagerRoute from './functions/ManagerRoute'
// Notify
import Notify from './components/Notify'


const { Footer, Content } = Layout;
function Pages() {

  const { auth } = useSelector(state => state)

    return (
        <Layout style={{ minHeight: '100vh'}}>
          <Sidebar/>
          <Layout className="site-layout">
          <Content>
            <ToastContainer />
            <Notify />
            {auth?.token && <SocketClient />}
            <Switch>

            {/* -----------Manager------------- */}
            <ManagerRoute exact path="/all-members" component={AllMembers} />
            <ManagerRoute exact path="/all-products" component={ProductList} />
            <ManagerRoute exact path="/all-categories" component={CategoryList} />
            <ManagerRoute exact path="/all-locations" component={LocationList} />
            {/* -----------Page---------------- */}
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <GuestRoute exact path="/profile" component={Profile} />
            <GuestRoute exact path="/profile/:id" component={Profile} />
            <GuestRoute exact path="/notification" component={Notification} />

            {/* ----------Buy Product----------- */}
            <Route exact path="/product-sale" component={ProductSaleList} />
            <Route exact path="/product-sale/:id" component={ProductSaleDetails} />
            <MemberRoute exact path="/buy-order-status" component={BuyOrderStatus} />
            <MemberRoute exact path="/shopping-cart" component={Cart} />
            {/* ----------Sell Product----------- */}
            <MemberRoute exact path="/my-product-sale" component={MyProductSale} />
            <MemberRoute exact path="/add-product-sale" component={AddProductSale} />
            <MemberRoute exact path="/sale-order" component={MySaleOrder} />
            {/* ----------Pick Up Product----------- */}
            <Route exact path="/invoice-request" component={InvoiceRequestList} />
            <Route exact path="/invoice-request/:id" component={InvoiceDetail} />
            <MemberRoute exact path="/add-invoice" component={AddInvoice} />
            <MemberRoute exact path="/my-invoice" component={MyInvoice} />
            {/* ----------Pick Up Product----------- */}
            <MemberRoute exact path="/my-shipment" component={MyShipment} />

            <Route path="*" exact component={NotFound} />

            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}><p>FAK CHAN HEW Design ©2021 Created by FAKCHANHEW Teams</p></Footer>
        </Layout>   
      </Layout>
    )
}

export default Pages
