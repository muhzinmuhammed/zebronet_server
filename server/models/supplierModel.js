import mongoose ,{Schema,model} from 'mongoose'

const supplierSchema=new Schema({
    supplierNo:{
        type:String,
        

    },
    supplierName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    taxNo:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    }
},{timestamps:true})

const supplierModel=model("supplier",supplierSchema)
export default supplierModel