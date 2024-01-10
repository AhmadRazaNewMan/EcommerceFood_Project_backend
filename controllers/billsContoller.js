const Bills = require('../modals/billsModel');
const billsModel = require('../modals/billsModel')

const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.send('Bill Generated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const getBillsController =async(req,res) =>{
  try {
     const bills = await Bills.find(); ;
    res.send(bills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

module.exports = {addBillsController,getBillsController};
