// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//     name:{
//         type: String,
//         required:[true,"name is required"]
//     },
//     email:{
//         type:String,
//         required:[true,"email is required"]
//     },
//     password:{
//         type:String,
//         min:8,
//     }
// },
// {
//     timeStamps:true,
// }
// );

// module.exports = mongoose.model("User",userSchema)


const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        min:8
    },
},{
    timeStamps:true
});
module.exports = mongoose.model("User",userSchema);