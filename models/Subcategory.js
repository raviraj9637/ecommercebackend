
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },
    subCategory : {
        type : String,
        required: true
    },
    date : {
        type: Date,
        default : Date.now
    }

})

module.exports = ProductSubCategory = mongoose.model('myProductSubCategory', SubCategorySchema)