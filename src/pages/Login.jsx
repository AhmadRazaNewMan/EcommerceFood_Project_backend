import { Button, Form ,Input} from 'antd'
import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import './login.css'


function Login() {

  const dispatch = useDispatch()
  const navigate= useNavigate()
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
  
      const res = await axios.post("/api/users/login",  value);
  
      message.success("User Login Successfully");
  
      localStorage.setItem('auth',JSON.stringify(res.data))
      // You may want to handle the response here, e.g., store user information or token
  
      navigate("/");
  
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      message.error("Error");
      console.log(error.message);
  
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  };
  useEffect(()=>{
    if(  localStorage.getItem('auth')){
    localStorage.getItem('auth')
    navigate("/")}
  },[navigate])
  return (
  <>
  <div className="main"><div className="register">
  <img width={200} height={200} style={{borderRadius:"50%"}} src="https://cdn.vectorstock.com/i/preview-1x/73/82/food-logo-vector-38377382.jpg" alt="" />

    <h3 style={{fontSize:"30px", fontWeight:"bold"}}>Login page</h3>
    <Form layout='vertical'  onFinish={handleSubmit}>
         
          <Form.Item name="userId" label="User ID">
            <Input placeholder='0XXXXXXXXXXXXXX'/>
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type='password' placeholder='Enter Your Password Here' />
          </Form.Item>
         
          <div className="d-flex justify-content-between">
            <p>Not A User <Link to="/register">Register Here !</Link></p>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </div>
        </Form>
  </div></div>
  </>
  )
}

export default Login