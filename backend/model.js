import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    address:{type:String, required:true}
    


})
export default mongoose.model.DETAIL||mongoose.model("DETAIL",userSchema)