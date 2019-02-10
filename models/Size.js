
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },
   
    adult : {
        type : String,
        required : true
    },
    kid : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }

})

module.exports = Size = mongoose.model('mySize', SizeSchema)



/**
 * make one model for size in that kids size and adult size
 * In product - Retailer price, retailer minimum order quantity, wholaseller price, wholesaller minimum order quantity, description, stock, quality, GST tax, add button and reset buton.
 * make one model for image 
 * 
 */