
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },
    color : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }

})

module.exports = Color = mongoose.model('myColor', ColorSchema)



/**
 * make one model for size in that kids size and adult size
 * In product - Retailer price, retailer minimum order quantity, wholaseller price, wholesaller minimum order quantity, description, stock, quality, GST tax, add button and reset buton.
 * make one model for image 
 * 
 */