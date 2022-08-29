const cloudinary=require('cloudinary')

cloudinary.config({ 
  cloud_name: 'nabeelms', 
  api_key: '624247368592251', 
  api_secret: 'ffSgX2RyMda4afRdEA1UTMXOMrc' 
});
module.exports =cloudinary;