const mongoose  = require("mongoose");



const noteSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    tittle:{
        type:String,
        required:[true,"please a add a tittle to the note"]
    },
    desc:{
        type:String,
        required:false
    },
    text:{
        type:String,
        required:[true,"please enter the text"]
    }
},
{
    timeStamps:true
});

module.exports = mongoose.model("Note",noteSchema);



 