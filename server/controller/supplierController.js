import supplierModel from "../models/supplierModel.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig.js";
import itemModel from "../models/itemModel.js";
import { v4 as uuidv4 } from "uuid"
// Add supplier
const addSupplier = async (req, res) => {
    try {
        const { supplierName, address, taxNo, country, phone, email } = req.body;
console.log(req.body);

        // Validate required fields
        if (!supplierName || !address || !taxNo || !country || !phone || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingSupplier = await supplierModel.findOne({ 
            $or: [{ phone }, { email }] 
        });
        if (existingSupplier) {
            return res.status(400).json({ message: "Supplier with this phone number or email already exists" });
        }

        // Create a new supplier without supplierNo initially
        const newSupplier = new supplierModel({
            supplierName,
            address,
            taxNo,
            country,
            phone,
            email
        });

        // Save to the database
        const savedSupplier = await newSupplier.save();

        // Generate supplierNo using the saved _id
        savedSupplier.supplierNo = savedSupplier._id.toString().slice(-6);

        // Update the document with supplierNo
        await savedSupplier.save();

        // Send response
        res.status(201).json({ message: "Supplier added successfully", data: savedSupplier });

    } catch (error) {
        console.error("Error adding supplier:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

//supplier data
const allSupplier = async (req, res) => {
    try {
        // Retrieve all suppliers from the database
        const suppliers = await supplierModel.find({status:true});

        // Send response with all suppliers
        res.status(200).json({ message: "Suppliers retrieved successfully", data: suppliers });
        
    } catch (error) {
        console.error("Error retrieving suppliers:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};




const addItem = async (req, res) => {
    try {
        console.log("kiuii");
        
        const { itemName, inventoryLocation, brand, category, supplierId, stock, price } = req.body;
console.log(req.body,"jkl");

        // Validate required fields
        if (!itemName || !inventoryLocation || !brand || !category || !stock || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if images are provided
        if (!req.files || req.files.length === 0) {
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
            itemImgae: imageUrls
        });

        // Save the item to the database
        const savedItem = await newItem.save();

        // Send response
        res.status(201).json({ message: "Item added successfully", data: savedItem });

    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
export {addSupplier,allSupplier,addItem}