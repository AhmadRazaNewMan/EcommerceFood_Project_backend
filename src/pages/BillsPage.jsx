import React, { useEffect, useState, useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import { Modal, Table, Button } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import './BillPages.css';

const BillsPage = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handlePrint =useReactToPrint({
    content:()=>componentRef.current
  })

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
  }, [dispatch]);

  const columns = [
    { title: 'ID', dataIndex: '_id' },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    { title: 'Contact Number', dataIndex: 'customerNumber' },
    // { title: 'Subtotal', dataIndex: 'subtotal' },
    { title: 'Total Amount', dataIndex: 'totalAmount' },
    { title: 'Tax', dataIndex: 'tax' },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1 style={{fontSize:"20px"}}>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
      {popupModal && (
        <Modal
          title='Invoice Detail'
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* Your modal content */}
          <div id='invoice-POS' ref={componentRef}>
            <center id='top'>
              <img height={200} width={200} src="https://cdn.vectorstock.com/i/preview-1x/73/82/food-logo-vector-38377382.jpg" alt="" />
            <h2 style={{fontSize:"20px"}}>Ahmad Food Corner</h2>
              <div className='logo'>
                <div className='info'>
                
                  <p>Contact:12356|Peshawar Pakistan</p>
                </div>
              </div>
            </center>
            <div id='mid'>
              <div className='mt-2'>
                <p>
                  Customer Name: <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No: <b>{selectedBill.customerNumber}</b>
                  <br />
                  {/* Date: <b>{selectedBill.data.toString().subString(0,10)}</b> */}
                  <br />
                </p>
                <hr style={{ margin: '5px' }} />
              </div>
            </div>
            <div id='bot'>
              <div id='table'>
                <table>
                  <tbody>
                    <tr className='tabletitle'>
                      <td className='item'>
                        <h2>Item</h2>
                      </td>
                      <td className='Hours'>
                        <h2>Qty</h2>
                      </td>
                      <td className='Rate'>
                        <h2>Price</h2>
                      </td>
                      <td className='Rate'>
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className='service'>
                          <td className='tableitem'>
                            <p className='itemtext'>{item.name}</p>
                          </td>
                          <td className='tableitem'>
                            <p className='itemtext'>{item.quantity}</p>
                          </td>
                          <td className='tableitem'>
                            <p className='itemtext'>${item.price}</p>
                          </td>
                          <td className='tableitem'>
                            <p className='itemtext'>
                            $ {item.price*item.quantity}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className='tabletitle'>
                      <td />
                      <td />
                      <td className='Rate'>
                        <h2>tax</h2>
                      </td>
                      <td className='payment'>
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className='tabletitle'>
                      <td />
                      <td />
                      <td className='Rate'>
                        <h2>Grand Total</h2>
                      </td>
                      <div className='payment'>
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id='legalcopy'>
                <p className='legal'>
                  <strong>Lorem ipsum, dolor sit amet </strong>consectetur adipisicing elit. Nulla pariatur dolorum
                  ratione, laudantium sit nesciunt recusandae <b>ahmaraz@gmail.com </b>
                </p>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end mt-3'>
            <Button type='primary' onClick={handlePrint}>
              print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
