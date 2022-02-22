import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Layout, Switch} from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    HomeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    ShopOutlined,
    ShoppingOutlined,
    CarOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    DeploymentUnitOutlined,
    GlobalOutlined,
    DatabaseOutlined
  } from '@ant-design/icons';
import { logout } from '../redux/actions/authAction';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {

    const { auth, notify, online } = useSelector(state => state);
    const dispatch = useDispatch();
    const [theme, setTheme] = useState('light')

    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light')
    }

    const logoutHandle = () => {
        dispatch(logout())
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={changeCollapsed} theme={theme}>
            <div className="logo" />
            <Menu defaultSelectedKeys={['1']} mode="vertical" theme={theme}>
                <Menu.Item key="23" title="Theme">
                    <div className="text-center">
                        <Switch onChange={changeTheme} size="small"/>
                    </div>
                </Menu.Item>
                { auth.token &&
                <Menu.Item key="15" icon={<UserOutlined />} style={{color: 'crimson'}}>
                    <Link to="/profile">{auth?.user?.full_name}</Link>
                </Menu.Item>
                }
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">หน้าหลัก</Link>
                </Menu.Item>
                
                <Menu.Item key="2" icon={<GlobalOutlined />}>
                    <Link to="/notification">
                        การแจ้งเตือน&nbsp;
                        <span className="badge bg-danger">
                            {notify.data.filter(item => item.readed === 'false').length}
                        </span>
                    </Link>
                </Menu.Item>

                <SubMenu key="sub1" icon={<ShoppingCartOutlined />} title="ซื้อสินค้า">
                    <Menu.Item key="3">
                        <Link to="/product-sale">รายการสินค้า</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/buy-order-status">สถานะคำสั่งซื้อ</Link>
                    </Menu.Item>
                    <Menu.Item key="25">
                        <Link to="/shopping-cart">ตะกร้าสินค้า</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<ShopOutlined />} title="ขายสินค้า">
                    <Menu.Item key="5">
                        <Link to="/add-product-sale">เพิ่มสินค้า</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/my-product-sale">สินค้าของฉัน</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to="/sale-order">ออเดอร์การขาย</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<ShoppingOutlined />} title="ฝากซื้อ">
                    <Menu.Item key="9">
                        <Link to="/add-invoice">เพิ่มใบฝากซื้อ</Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link to="/my-invoice">ใบฝากซื้อของฉัน</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<CarOutlined />} title="รับหิ้ว">
                    <Menu.Item key="8">
                        <Link to="/invoice-request">รายการใบฝากซื้อ</Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link to="/my-shipment">การจัดส่งของฉัน</Link>
                    </Menu.Item>
                </SubMenu>

                {
                    auth.user?.role === 2 &&
                    <SubMenu key="sub5" icon={<DatabaseOutlined />} title="การจัดการ">
                        <Menu.Item key="16">
                            <Link to="/all-members">ข้อมูลสมาชิก</Link>
                        </Menu.Item>
                        <Menu.Item key="18">
                            <Link to="/all-categories">ข้อมูลหมวดหมู่</Link>
                        </Menu.Item>
                        <Menu.Item key="19">
                            <Link to="/all-products">ข้อมูลสินค้า</Link>
                        </Menu.Item>
                        <Menu.Item key="24">
                            <Link to="/all-locations">ข้อมูลสถานที่</Link>
                        </Menu.Item>
                        <Menu.Item key="22">
                            <Link to="/all-locations">รายงานภาพรวม</Link>
                        </Menu.Item>
                    </SubMenu>
                }

                { auth.token
                ?                 
                    <Menu.Item key="14" icon={<LogoutOutlined />} onClick={logoutHandle}>
                        ออกจากระบบ
                    </Menu.Item>
                :
                    <>
                    <Menu.Item key="12" icon={<LoginOutlined />}>
                        <Link to="/login">เข้าสู่ระบบ</Link>
                    </Menu.Item>
                    <Menu.Item key="13" icon={<UserAddOutlined />}>
                        <Link to="/register">สมัครสมาชิก</Link>
                    </Menu.Item>
                    </>
                }
                <Menu.Item key="17" icon={<DeploymentUnitOutlined spin />}>
                    <span className="badge bg-success rounded-pill">ออนไลน์ {online.length}</span>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default Sidebar
