const ItemModel = require('../modals/ItemModel');

const getItemController = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addPostItems = async (req, res) => {
  try {
    const item = new ItemModel(req.body);
    await item.save();
    res.status(201).json({ message: 'Item added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Item by using put
const editItemController= async(req,res)=>{
  try {
    await ItemModel.findOneAndUpdate({_id:req.body.itemId},req.body)
    res.status(201).send("Item Updated!")
    
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
    
  }
}
// Delete item 
const deleteItemController= async(req,res)=>{
  try {
    await ItemModel.findOneAndDelete({_id:req.body.itemId}) 
   
    res.status(200).send("Item Deleted!")
    
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
    
  }

}

module.exports = { getItemController, addPostItems, editItemController, deleteItemController };

