const mongoose = require('mongoose')
const Schema = mongoose.Schema


const testSchema = new Schema({

title:{
    type:String,
    require:true
}

} , {timestamps:true})

const test = mongoose.model('test' ,testSchema )
module.exports = test