const mongoose =require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId,

const  professionSchema=mongoose.Schema(
    {
        profession_name:{
            type:String,
            default:null,
            unique:true,
        },
        hiring_type:{
            type:String,
            default:null,
        }
    },{
        timestamps:true
    }
)

const Professions=mongoose.model('Profession',professionSchema);

module.exports=Professions;