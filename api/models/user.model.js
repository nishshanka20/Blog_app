import mongoose from mongoose;

const userSchema=new mongoose.schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamp:true}
);

const User=mongoose.model('User',userSchema);
export default User;