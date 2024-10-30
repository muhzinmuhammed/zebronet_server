
import { addSupplier,allSupplier } from "../controller/supplierController.js";
import express from 'express'
const route=express.Router()

//add supplier

route.post('/add_supplier',addSupplier)

//find all supplier
route.get('/all_supplier',allSupplier)


export default route