
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCodeSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },
    productCode : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }

})

module.exports = ProductCode = mongoose.model('myProduct', ProductCodeSchema)