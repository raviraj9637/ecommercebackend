
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DescriptionSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'myPerson'
    },
    
    description : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }

})

module.exports = Descrption = mongoose.model('myDescription', DescriptionSchema)