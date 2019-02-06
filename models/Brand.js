
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },

    brandName : {
        type : String,
        required : true
    },
    
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = ProductBrand = mongoose.model('myBrand', BrandSchema)