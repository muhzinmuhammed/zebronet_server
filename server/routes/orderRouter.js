import { addOrder, allOrder } from '../controller/orderController.js';
import express from 'express'
const route=express.Router()

//add order
route.post('/add_order',addOrder)

route.get('/all_orders',allOrder)

export default route