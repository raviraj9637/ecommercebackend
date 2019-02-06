
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },
    productType : {
        type : String,
        required : true
    },
    promoter : {
        type : String,
        required : true
    },
    productCode : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    subCategory : {
        type : String,
        required: true
    },
    brandName : {
        type : String,
        required : true
    },
    
    img : [
        {
            img1 : {
                type: String,
                // required : true
            },
            img2: {
                type : String
            },
            date : {
                type: Date,
                default : Date.now
            }
        }
    ],
    date : {
        type: Date,
        default : Date.now
    }

})

module.exports = Product = mongoose.model('myProduct', ProductSchema)