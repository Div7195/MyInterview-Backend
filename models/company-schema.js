import mongoose from 'mongoose'

const companySchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    companyLogo:{
        type:String,
        required:true
    }
})

const company=mongoose.model('company',companySchema);
export default company;