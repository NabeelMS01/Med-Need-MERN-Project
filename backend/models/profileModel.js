const mongoose= require('mongoose')

const ObjectId =mongoose.Schema.Types.ObjectId


const profileSchema=mongoose.Schema(
    { 
        user_id:{
            type:ObjectId,
            ref:"User",
            unique:true
        },
        profile_img:{
          type:Object,
          default:null
        },
        name:{
            type:String,
             
        },
        pincode:{
            type:Number,
             
        },
        email:{
            type:String,
            ref:"User"
        },
        profile_image:{
            type:String
        },
        date_of_birth:{
            type:Date,
            default:null
        },
        gender:{
            type:String,
            default:null
        },
        address:{
            type:String,
            default:null
        },
        location:{
            type:String,
            default:null
        },
        geo_location:{
            type:Object,
            default:{
                latitude:null,
                longitude:null
            }
        },
        city:{
            type:String,
            default:null
        },
        about:{
            type:String,
            default:null
        },
        mobile:{
            type:Number,
            default:null
        },
        state:{
            type:String,
            default:null
        },
         country:{
            type:String,
            default:null,

         },
         profession:{
            type:String,
            default:null

         },
         resume:{
            type:Object,
            default:null,
         },
         experience:{
            type:String,
            default:null,
         },

         status:{
            type:Boolean,
            default:false,
         },
         approval_status:{
             type:String,
            default:"pending",
         },
         reviews:{
            type:Array,
            default:null,
         },
        
         hiring_status:{
            type:Boolean,
            default:true,
         },
         work_ongoing:{
            type:Boolean,
            default:false,

         },
         jobs_completed:{
            type:Number,
            default:0, 
         },
         languages:{
            type:Array,
            default:null
            
         }

        
    }
)

const Profile = mongoose.model('Profile',profileSchema);

module.exports =Profile