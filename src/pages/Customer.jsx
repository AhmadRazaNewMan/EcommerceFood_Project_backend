import React, { useState,useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';


const Customer = () => {
    const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();


    const getAllBills = async () => {
        try {
          dispatch({
            type: 'SHOW_LOADING',
          });
    
          const response = await axios.get('/api/bills/get-bills');
          const data = response.data;
          console.log(data);
          setBillsData(data);
    
          dispatch({
            type: 'HIDE_LOADING',
          });
        } catch (error) {
          console.error('Error fetching bills:', error);
          // Add additional error handling if needed
        }
      };
      useEffect(() => {
        getAllBills();
      }, [dispatch]);const columns = [
        { title: 'ID', dataIndex: '_id' },
        {
          title: 'Customer Name',
          dataIndex: 'customerName',
        },
        { title: 'Contact Number', dataIndex: 'customerNumber' },
      
       
      ];


  return (
    <DefaultLayout>
        <h2>hello</h2>
        <Table columns={columns} dataSource={billsData} bordered pagination={false} />
      
    </DefaultLayout>
  )
}

export default Customer
