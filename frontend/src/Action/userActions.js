import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUESTS, USER_LOGIN_SUCCESS,USER_LOGOUT } from "../Constants/UserConstants";


export const login =(email,password)=>async (dispatch)=>{
   
    try {
          dispatch({type:USER_LOGIN_REQUESTS})
  const config = {
    header: {
      "content-type": "application/json",
      
    },
  };
   const {data}= await axios
   .post(
     "/login",
     {
       email,
       password,
     },
     config
   )
   
   dispatch({type:USER_LOGIN_SUCCESS,payload:data})
   localStorage.setItem("userInfo",JSON.stringify(data))

    } catch (error) {
  console.log(error);
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error 
        })
        
    }

}
 
export const logout =()=>async(dispatch)=>{
  localStorage.removeItem("userInfo");
  dispatch({type:USER_LOGOUT})
}
 
