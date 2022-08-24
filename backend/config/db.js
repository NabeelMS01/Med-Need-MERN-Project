const mongoose =require('mongoose')




const connectDb= async()=>{
    try {
        let URI =process.env.MONGO_URI
       
         
        mongoose.connect(URI ,(err)=>{
            if(err)throw err;
                
                console.log("mongo db connected");
            
        })
    } catch (error) {
        console.log(`error:${error.message}`);
        process.exit();
    }
}

module.exports = connectDb