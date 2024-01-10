import React from 'react'
import {Button, Card} from 'antd'
import { useDispatch } from 'react-redux';

const ItemList= ({item}) => {
  const dispatch = useDispatch();
  const handleAddTOCart=()=>{
    dispatch({
      type:"ADD_TO_CART",
      payload:{...item,quantity:1}
    })
  }
  const { Meta } = Card;
  return (
    
   
    <div>
      <Card
    hoverable

    style={{ width: 250,marginBottom:20 }}
    cover={<img alt={item.name}src={item.image}  style={{height:250}}/>}
  >
    <Meta title={item.name} />
    <div className='item-button'>
      <Button onClick={()=>handleAddTOCart()}>Add to Cart</Button>

    </div>
  </Card>
    
    </div>
  )
}

export default ItemList
