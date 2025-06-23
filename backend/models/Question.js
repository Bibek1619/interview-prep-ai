const mongoose=require('mongoose');

const questionSchema = new mongoose.Schema({
    session:{
        type:mongoose.Schema.Types.ObjectId,ref:"session"},
        question : string,
        answer:string,
        ispinned:{
            type:Boolean,default:false
        },
        
            
        },
       { timestamps:true}
    
    
    );
    module.exports = mongoose.model('Question', questionSchema);
        

    