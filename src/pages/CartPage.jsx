import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table, message, Form, Input, Select } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);

  const handleIncrement = (record) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: 'UPDATE_CART',
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => <img src={image} alt={record.name} height={60} width={60} />,
    },
    { title: 'Price', dataIndex: 'price' },
    {
      title: 'Quantity',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <PlusCircleOutlined onClick={() => handleIncrement(record)} />
          <b>{record.quantity}</b>
          <MinusCircleOutlined onClick={() => handleDecrement(record)} />
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <DeleteOutlined
          onClick={() =>
            dispatch({
              type: 'DELETE_FROM_CART',
              payload: { _id: record._id },
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    for (let i of cartItems) {
      temp += i.quantity * i.price;
    }
    setSubTotal(temp);
  }, [cartItems]);

  const handleSubmit = async (values) => {
    try {
      const newObject = {
        ...values,
        subTotal,
        cartItems,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))),
        userId: JSON.parse(localStorage.getItem('auth'))
      };

      await axios.post('/api/bills/add-bills', newObject);
      message.success('Bill generated successfully');
      navigate('/bills');
    } catch (error) {
      message.error('Something went wrong');
      console.log(error, 'error is there');
    }
  };

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex flex-column align-items-start">
        <hr />
        <h3>
          SUBTOTAL: $ <b>{subTotal} /=</b>
        </h3>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal onCancel={() => setBillPopup(false)} title={'Create Invoice'} visible={billPopup} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerNumber" label="Customer Contact">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-item">
            <h5>SubTotal: <b>{subTotal}</b> </h5>
            <h4>
              Tax
              <b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              Grand Total - <b>{Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}</b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
