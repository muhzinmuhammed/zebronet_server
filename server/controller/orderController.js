import itemModel from "../models/itemModel.js";
import orderModel from "../models/purchaseModel.js";
import supplierModel from "../models/supplierModel.js";

//add order

const addOrder = async (req, res) => {
    try {
        // Extracting order details from request body
        const { orderDate, itemId, supplierId, qty } = req.body;

        // Fetch supplier details from database
        const item = await itemModel.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Calculate total price using supplier's price
        const price = item.price;
        const totalPrice = qty * price;
      const netAmount=totalPrice-item.discountPrice
        

        // Create a new order object
        const newOrder = new orderModel({
            orderDate,
            itemId,
            supplierId,
            qty,
            price,
            totalPrice,
            netAmount
        });

        // Generate order number
        newOrder.orderNo = newOrder._id.toString().slice(-6);

        // Save the order to the database
        await newOrder.save();

        // Send success response
        return res.status(201).json({ message: "Order added successfully", data: newOrder });
    } catch (error) {
        console.error("Error adding order:", error);
        // Send error response
        return res.status(500).json({ message: "Failed to add order", error: error.message });
    }
};


// all order
const allOrder=async(req,res)=>{
    try {
        const orders=await orderModel.find().populate('itemId').populate('supplierId')
        if (orders) {
          return res.status(200).json({data:orders})  
        }
    } catch (error) {
        
    }
}

export {addOrder,allOrder}