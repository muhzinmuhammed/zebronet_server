import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
    orderNo: {
        type: String,


    },
    orderDate: {
        type: Date,
        required: true
    },

    itemId: {

        type: Schema.Types.ObjectId,
        ref: 'item'
    },



    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'supplier'
    },
    qty: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
   
   price:{
    type: Number,
    required: true
   },
   status: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled'],
    default:'pending',
    required: true
}
}, { timestamps: true })

const orderModel = model("order", orderSchema)
export default orderModel
