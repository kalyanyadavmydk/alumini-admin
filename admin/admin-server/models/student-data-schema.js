const mongoose=require('mongoose');

const gallerySchema=new mongoose.Schema({
  name:{
    type:String
  },
  rollnum:{
      type:String
  },
  batch:{
      type:Number
  },
  degree:{
      type:String
  },
  phonenum:{
      type:Number
  },
  gmail:{
      type:String
  }

});


const student=mongoose.model('student-data',gallerySchema);
module.exports=student;