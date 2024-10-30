import { addItem, allItems } from "../controller/itemController.js";
import express from 'express'
import multer from 'multer'
const route=express.Router()

const upload=multer()
//add item

route.post('/add_item',upload.array('imageUrl'), addItem)

//all item

route.get('/all_item',allItems)

export default route