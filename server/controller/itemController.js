import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig.js";
import itemModel from "../models/itemModel.js";
import { v4 as uuidv4 } from "uuid"

//add item

const addItem = async (req, res) => {
    console.log(req.body);
    
    try {
        const { itemName, inventoryLocation, brand, category, supplierId, stock, price,discountPrice } = req.body;

        // Validate required fields
        if (!itemName || !inventoryLocation || !brand || !category || !stock || !price || !supplierId) {
            return res.status(400).json({ message: "All fields are required" });
        }


        // Check if images are provided
        if (!req.files || req.files.length == 0) {
            return res.status(400).json({ message: "Please upload at least one image" });
        }

        // Upload images to Firebase Storage
        const imageUrls = [];
        for (const file of req.files) {
            const imageRef = ref(storage, `items/${uuidv4()}-${file.originalname}`);
            await uploadBytes(imageRef, file.buffer);
            const imageUrl = await getDownloadURL(imageRef);
            imageUrls.push(imageUrl);
        }


        // Create a new item
        const newItem = new itemModel({
            itemName,
            inventoryLocation,
            brand,
            category,
            supplierId,
            stock,
            price,
            discountPrice,
            itemImage: imageUrls, // Ensure this matches the schema field
        });
        
        newItem.itemNo = newItem._id.toString().slice(-6);
        

        // Save the item to the database
        const savedItem = await newItem.save();

        // Send response
        res.status(201).json({ message: "Item added successfully", data: savedItem });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// all items

const allItems=async(req,res)=>{
    try {
        const items=await itemModel.find({status:true}).populate('supplierId').exec()
        if (items) {
            return res.status(200).json({data:items})
            
        }
    } catch (error) {
        console.error("Error retrieving suppliers:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
        
    }
}

export {addItem,allItems}