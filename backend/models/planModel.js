const mongoose =require('mongoose')


const planSchema =mongoose.Schema(
    {
        plan_name:{
            type:String,
             
        },
        period:{
            type:Number,
        
        }
    }
)

const Plan=mongoose.model('Plan',planSchema);

module.exports=Plan;