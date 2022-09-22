import {createStore , applyMiddleware,combineReducers} from 'redux'



import thunk from "redux-thunk"
import { userLoginReducer } from './Reducer/userReducer';

const reducers =combineReducers({
 userLogin:userLoginReducer,
 

})
const initialState={
   userLogin:userLoginReducer
}

const middlewere =[thunk];

const store =createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewere)
)

export default store;