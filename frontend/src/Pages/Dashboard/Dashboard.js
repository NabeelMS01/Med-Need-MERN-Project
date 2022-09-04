import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useNavigationType } from 'react-router-dom';
import swal from 'sweetalert';
import UserDrawer from '../../Components/UserDashboard/UserDrawer'
import { AlertContext } from '../../contexts/contexts';

function Dashboard() {
  const navigate = useNavigate();

  const { formAlert, setformAlert } = useContext(AlertContext);
  useEffect(() => {
    console.log(formAlert);
    setTimeout(() => {
      getdata();
    }, 3000);
  }, [formAlert]);

 

  async function getdata() {
    // const data = await axios.get('/home')

    const userId = localStorage.getItem("userInfo");
    const user = await JSON.parse(userId);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (user.isProfessional) {
      await axios.post("/formStatus", user, config).then(({ data }) => {
        console.log(data);

        if (!data.status && !formAlert) {
          swal(
            "Please update your profile  in order to list your profile \n \n\n\n ",
            {
              buttons: {
                cancel: "May be later",
                sure: true,
              },
            }
          ).then((value) => {
            switch (value) {
              case "sure":
                navigate("/update-profile");
                break;
              case "cancel":
                setformAlert(true);
             break;
            }
          });
        }
      });
    }
  }



  return (
    <div>
         <UserDrawer>
                
         </UserDrawer>


    </div>
  )
}

export default Dashboard