import { UserCircleIcon } from "@heroicons/react/24/outline";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUESTS, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../Constants/UserConstants";



export const modalReducer = (state={}, action )=>{
    switch  (action.type){
        case USER_LOGIN_REQUESTS :   
        return  {loading:true};
        case USER_LOGIN_SUCCESS:
            return{loading:false.valueOf,userInfo:action.payload}

        case USER_LOGIN_FAIL:
         return {loading:false,error:action.payload};
         
     
         default : return state;    
           
    }
}