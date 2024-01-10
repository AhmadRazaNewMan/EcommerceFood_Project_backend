import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import '../styles/DefaultLayout.css'
import {Link, useNavigate} from 'react-router-dom'
import Spinner from './Spinner';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined ,
  UserOutlined,
  CopyOutlined ,
  OrderedListOutlined ,
  LogoutOutlined ,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, List } from 'antd';
const { Header, Sider, Content } = Layout;


const DefaultLayout = ({children}) => {
  const navigate = useNavigate()
  const { cartItems ,loading} = useSelector(state => state.rootReducer);
   const dispatch = useDispatch();
   // to get local storage data

   useEffect(()=>{

     localStorage.setItem('cartItem',JSON.stringify(cartItems))

   },[cartItems])


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      {loading && <Spinner/>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-center text-light font-wight-bold"  ><h1>Y & I</h1></div>
        <Menu
          
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname} > 
      
        
          <Menu.Item  key={'/'} icon={<HomeOutlined />} ><Link to={'/'}>Home</Link></Menu.Item>
          <Menu.Item  key={'/bills'} icon={<CopyOutlined />} ><Link to={'/bills'}>Bills</Link></Menu.Item>
          <Menu.Item  key={'/items'} icon={<OrderedListOutlined />} ><Link to={'/items'}>Items</Link></Menu.Item>
          <Menu.Item  key={'/customers'} icon={<UserOutlined />} ><Link to={'/customer'}>Customers</Link></Menu.Item>
          <Menu.Item  key={'/logout'} icon={<LogoutOutlined />} 
           onClick={()=>{
            localStorage.removeItem('auth')
            navigate("/login")
          }}>Logout</Menu.Item>
          


          </Menu>
      </Sider>
      <Layout>
        <Header className='ant-layout-header'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          
        >
          
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        <div className="cart-item" onClick={()=>navigate('/cart')}>
          <p>{cartItems.length}</p>
          <ShoppingCartOutlined/>

        </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height:"90vh",
          }}
        >
         {children}
         
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;