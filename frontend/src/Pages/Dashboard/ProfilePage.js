import React from 'react'
import ClientProfile from '../../Components/Profiles/ClientProfile';
import ProfessionalProfile from '../../Components/Profiles/ProProfile';

function ProfilePage() {

 let userInfo=JSON.parse(localStorage.getItem('userInfo'))
 
  return (
    <div>
{
  userInfo.isProfessional ?<ProfessionalProfile/>: <ClientProfile/>
}
 


    </div>
  )
}

export default ProfilePage