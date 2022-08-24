const mongoose =require('mongoose')

const ObjectId=mongoose.Schema.Types.ObjectId
const subscriptionDetails=mongoose.Schema(
    {
        user_id:{
            type:ObjectId,
            ref:"User"
        },
        plan_name:{
           type:String,
           default:null   
        },
        plan:{
           type:ObjectId,
           ref:"Plan"
        },
        start_date:{
            type:Date,
            default:null
        },
        end_date:{
            type:Date,
            default:null
        }
    }
)

const PlanDetails=mongoose.model('PlanDetails',professionSchema);

module.exports=PlanDetails;