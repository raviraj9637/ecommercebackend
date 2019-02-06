
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },
    
    category : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }

})

module.exports = ProductCategory = mongoose.model('myProductCategory', CategorySchema)