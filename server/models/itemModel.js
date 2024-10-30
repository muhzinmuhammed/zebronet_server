import mongoose ,{Schema,model} from 'mongoose'

const itemSchema=new Schema({
    itemNo:{
        type:String,
        

    },
    itemName:{
        type:String,
        required:true
    },
    inventoryLocation:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    supplierId:{
        type: Schema.Types.ObjectId,
     ref:'supplier'
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
       
    },
    itemImage: [{ type: String }],
    status:{
        type:Boolean,
        required:true,
        default:true
    }
},{timestamps:true})

const itemModel=model("item",itemSchema)
export default itemModel