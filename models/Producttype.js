
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductTypeSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },

    productType : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
    
})

module.exports = ProductType = mongoose.model('myProducttype', ProductTypeSchema)