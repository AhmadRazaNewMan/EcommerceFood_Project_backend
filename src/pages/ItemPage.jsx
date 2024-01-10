import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DefaultLayout from '../components/DefaultLayout';
import { Modal, Button, Table, Form, Input, Select, message } from 'antd';

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch();
  const [popupModal, setPopupModal] = useState(false);
  const [editItem,setEditItem] = useState(null)

  const getAllItem = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const { data } = await axios.get("/api/items/get-item");
      console.log(data);
      setItemData(data);

      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItem();
  }, [dispatch]);

  const handleDelete = async(record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      await axios.post("/api/items/delete-item", {itemId:record._id});
      message.success("Item Delete successfully");
      setPopupModal(false);

      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
    
  
  };

  const handleSubmit = async (values) => {
   if(editItem===null){
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      await axios.post("/api/items/post-item", values);
      message.success("Item Added successfully");
      setPopupModal(false);

      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
   }else{
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      await axios.put("/api/items/edit-item", {...values,itemId:editItem._id});
      message.success("Item updated successfully");
      setPopupModal(false);

      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
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
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EditOutlined onClick={()=>{setEditItem(record),setPopupModal(true)}} />
          <DeleteOutlined onClick={() => handleDelete(record)} />
          
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Item List</h1>
        <Button type='primary' onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemData} bordered />
      {
        popupModal && (<Modal title={`${editItem!==null?"Edit Item ": "Add New Item"}`} visible={popupModal} onCancel={() => {setPopupModal(false),setEditItem(null)}} footer={false}>
        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image Url">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="drinks">Drinks</Select.Option>
              <Select.Option value="rice">Rice</Select.Option>
              <Select.Option value="noodles">Noodles</Select.Option>
            </Select>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </div>
        </Form>
      </Modal>)
      }
    </DefaultLayout>
  );
};

export default ItemPage;
